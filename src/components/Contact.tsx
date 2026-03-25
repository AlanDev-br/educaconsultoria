"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?:    string[];
  email?:   string[];
  phone?:   string[];
  company?: string[];
  service?: string[];
  message?: string[];
}

interface FormState {
  name:    string;
  email:   string;
  phone:   string;
  company: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "", email: "", phone: "", company: "", service: "", message: "",
};

const SERVICE_OPTIONS = [
  { value: "treinamento", label: "Desenvolvimento Profissional e Gerencial" },
  { value: "consultoria", label: "Apoio à Educação / Consultoria Pedagógica" },
  { value: "traducao",    label: "Tradução e Interpretação"                  },
  { value: "design",      label: "Design e Identidade Visual"                },
  { value: "portal",      label: "Gestão de Conteúdos e Portais"             },
  { value: "musical",     label: "Produção Musical"                          },
  { value: "outro",       label: "Outro"                                     },
] as const;

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5A16 16 0 0 0 12 12.59l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 20 14h0l2.92 2.92z"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "(82) 99629-7278",
    href: "https://wa.me/5582996297278",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "E-mail",
    value: "educaconsultoriaeservicos@gmail.com",
    href: "mailto:educaconsultoriaeservicos@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Localização",
    value: "Maceió – AL, Brasil",
    href: null,
  },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status,       setStatus]       = useState<FormStatus>("idle");
  const [serverMsg,    setServerMsg]    = useState("");
  const [fieldErrors,  setFieldErrors]  = useState<FieldErrors>({});
  const [form,         setForm]         = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );

    const targets = sectionRef.current?.querySelectorAll(".reveal, .reveal-right") ?? [];
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the server-side error for this field as soon as the user edits it
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  /**
   * Lightweight client-side check for UX only.
   * Real validation happens server-side via Zod — this is not a security boundary.
   */
  function clientValidate(): boolean {
    const errors: FieldErrors = {};
    if (form.name.trim().length < 2)   errors.name    = ["Nome obrigatório"];
    if (!form.email.includes("@"))     errors.email   = ["E-mail inválido"];
    if (!form.service)                 errors.service = ["Selecione um serviço"];
    if (form.message.trim().length < 10) errors.message = ["Mensagem muito curta"];
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!clientValidate()) return;

    setStatus("loading");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setServerMsg(data.message);
        setForm(INITIAL_FORM);
      } else if (res.status === 422 && data.fields) {
        setStatus("error");
        setFieldErrors(data.fields);
        setServerMsg("Corrija os campos abaixo.");
      } else {
        setStatus("error");
        setServerMsg(data.error ?? "Erro ao enviar. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  }

  function inputClass(field: keyof FieldErrors): string {
    return [
      "w-full border rounded-xl px-4 py-3 text-slate-800 text-sm",
      "placeholder-slate-400 transition-all input-brand",
      fieldErrors[field]
        ? "border-red-400 bg-red-50/50"
        : "border-slate-200 hover:border-slate-300",
    ].join(" ");
  }

  return (
    <section id="contato" ref={sectionRef} className="py-24 lg:py-32 dots-bg" aria-label="Formulário de contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: info ── */}
          <div>
            <div className="reveal inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest">Contato</span>
            </div>

            <h2 className="reveal delay-100 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-5 leading-tight">
              Vamos crescer{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0B2D6B, #1848BB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                juntos?
              </span>
            </h2>

            <p className="reveal delay-200 text-slate-500 text-lg leading-relaxed mb-10">
              Entre em contato e saiba como podemos colaborar com sua
              instituição ou projeto. Nossa equipe responde em até 24h.
            </p>

            {/* Contact info with accessible links */}
            <address className="reveal delay-300 space-y-5 not-italic">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-700 font-semibold text-sm hover:text-brand-blue transition-colors"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-700 font-semibold text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </address>
          </div>

          {/* ── Right: form ── */}
          <div className="reveal-right bg-white rounded-3xl border border-slate-100 shadow-xl p-8 lg:p-10">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2DB84B" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Mensagem enviada!</h3>
                <p className="text-slate-500 text-sm mb-6">{serverMsg}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-brand-blue text-sm font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Envie sua mensagem</h3>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Nome <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name" type="text" name="name"
                      value={form.name} onChange={handleChange}
                      placeholder="Seu nome completo"
                      autoComplete="name" maxLength={100}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      className={inputClass("name")}
                    />
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1" role="alert">{fieldErrors.name[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                      E-mail <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email" type="email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="seu@email.com"
                      autoComplete="email" maxLength={254}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      className={inputClass("email")}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1" role="alert">{fieldErrors.email[0]}</p>}
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 mb-1.5">Telefone</label>
                    <input
                      id="phone" type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      placeholder="(82) 99999-9999"
                      autoComplete="tel" maxLength={20}
                      className={inputClass("phone")}
                    />
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{fieldErrors.phone[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-slate-600 mb-1.5">Instituição / Empresa</label>
                    <input
                      id="company" type="text" name="company"
                      value={form.company} onChange={handleChange}
                      placeholder="Nome da instituição"
                      autoComplete="organization" maxLength={150}
                      className={inputClass("company")}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Serviço de interesse <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!fieldErrors.service}
                    className={`${inputClass("service")} cursor-pointer`}
                  >
                    <option value="">Selecione um serviço</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {fieldErrors.service && <p className="text-red-500 text-xs mt-1" role="alert">{fieldErrors.service[0]}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Mensagem <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Conte sobre seu desafio ou necessidade..."
                    rows={4} maxLength={2000}
                    aria-required="true"
                    aria-invalid={!!fieldErrors.message}
                    className={`${inputClass("message")} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {fieldErrors.message
                      ? <p className="text-red-500 text-xs" role="alert">{fieldErrors.message[0]}</p>
                      : <span />
                    }
                    <span className="text-xs text-slate-400" aria-live="polite">
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Server-level error banner */}
                {status === "error" && serverMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl" role="alert">
                    {serverMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-shine w-full bg-brand-blue hover:bg-brand-blue-mid disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/30 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
