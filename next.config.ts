import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Security headers applied to every response.
   * Adjust the Content-Security-Policy when adding third-party scripts
   * (e.g. Google Analytics, Hotjar) — each new origin must be whitelisted.
   */
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // Prevent the page from being embedded in an <iframe> (clickjacking)
        { key: "X-Frame-Options", value: "DENY" },

        // Stop browsers from MIME-sniffing responses away from the declared Content-Type
        { key: "X-Content-Type-Options", value: "nosniff" },

        // Send the full URL only to same-origin requests; only the origin to cross-origin
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

        // Disable browser features the site doesn't use
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

        /**
         * Content-Security-Policy
         *
         * NOTE: `unsafe-inline` and `unsafe-eval` are required by Next.js
         * for its runtime scripts and style injection. To remove them in
         * production, implement nonce-based CSP with Next.js middleware.
         * See: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
         */
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            // Allow WhatsApp redirect target
            "connect-src 'self' https://wa.me",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
