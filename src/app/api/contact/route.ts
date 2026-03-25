import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rateLimit";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strips newlines and tabs before writing user-supplied data to logs,
 * preventing log-injection attacks where a crafted payload could forge
 * additional log entries.
 */
function sanitizeForLog(value: string): string {
  return value.replace(/[\r\n\t]/g, " ").slice(0, 200);
}

/**
 * Resolves the real client IP from proxy headers.
 * X-Forwarded-For is set by most reverse proxies (Vercel, Nginx, Cloudflare).
 * Only trust this header when the proxy is under your control.
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limiting — checked before any parsing to fail fast.
  const ip = getClientIp(req);
  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 15 minutos." },
      {
        status: 429,
        headers: { "Retry-After": "900", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  // 2. Content-Type guard — reject non-JSON payloads early.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 415 });
  }

  // 3. Payload size guard — protects against large body DoS attacks.
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10_000) {
    return NextResponse.json({ error: "Payload muito grande." }, { status: 413 });
  }

  // 4. Parse body — isolate JSON errors from validation errors.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  // 5. Server-side validation — the frontend schema is only for UX;
  //    this is the authoritative check. Never skip it.
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", fields: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, service, message } = result.data;

  // 6. Log safely — sanitize before writing to avoid log injection.
  console.log("[contact]", {
    name: sanitizeForLog(name),
    email: sanitizeForLog(email),
    service,
    ts: new Date().toISOString(),
  });

  // 7. Send e-mail (configure SMTP via environment variables).
  //    See .env.example for the required variables.
  //    Uncomment and configure nodemailer when SMTP credentials are available.
  //
  // if (process.env.SMTP_HOST) {
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST,
  //     port: Number(process.env.SMTP_PORT ?? 587),
  //     secure: false,
  //     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  //   });
  //   await transporter.sendMail({
  //     from: `"Site Educa" <${process.env.SMTP_USER}>`,
  //     to: process.env.CONTACT_EMAIL,
  //     subject: `[Contato] ${service} — ${name}`,
  //     text: message,
  //   });
  // }

  return NextResponse.json(
    { success: true, message: "Mensagem recebida! Entraremos em contato em até 24h." },
    {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(remaining),
        "Cache-Control": "no-store",
      },
    }
  );
}

// Block all other HTTP verbs on this endpoint.
export async function GET()    { return NextResponse.json({ error: "Método não permitido." }, { status: 405 }); }
export async function PUT()    { return NextResponse.json({ error: "Método não permitido." }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ error: "Método não permitido." }, { status: 405 }); }
export async function PATCH()  { return NextResponse.json({ error: "Método não permitido." }, { status: 405 }); }
