/**
 * In-memory rate limiter keyed by IP address.
 *
 * Limitations to address before production:
 * - State is lost on server restart (acceptable for serverless cold starts)
 * - Does not share state across multiple instances — replace with Redis
 *   (e.g. Upstash) when running more than one server process.
 * - Stale entries are pruned on each request to avoid unbounded memory growth.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1_000; // 15-minute sliding window
const MAX_REQUESTS = 5;

const store = new Map<string, RateLimitRecord>();

/** Remove entries whose window has already expired. */
function pruneExpired(): void {
  const now = Date.now();
  for (const [key, record] of store) {
    if (now > record.resetAt) store.delete(key);
  }
}

export function rateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  pruneExpired();

  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
