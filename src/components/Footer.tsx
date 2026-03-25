import Image from "next/image";

const FOOTER_LINKS = {
  Serviços: [
    { label: "Desenvolvimento Profissional", href: "#servicos" },
    { label: "Apoio à Educação",             href: "#servicos" },
    { label: "Tradução e Interpretação",     href: "#servicos" },
    { label: "Design e Identidade Visual",   href: "#servicos" },
    { label: "Gestão de Portais",            href: "#servicos" },
    { label: "Produção Musical",             href: "#servicos" },
  ],
  Empresa: [
    { label: "Sobre Nós", href: "#sobre"     },
    { label: "LabFor",    href: "#sobre"     },
    { label: "Parcerias", href: "#sobre"     },
    { label: "Contato",   href: "#contato"   },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hero-bg text-white" aria-label="Rodapé">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Image
              src="/educa-logo.jpeg"
              alt="Educa Consultoria e Serviços"
              width={160}
              height={50}
              className="h-12 w-auto object-contain mb-5"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-4">
              Soluções completas em educação, consultoria, design, tradução
              e produção musical. Maceió – AL, atendendo todo o Brasil.
            </p>

            {/* Clickable contact info */}
            <address className="not-italic space-y-1.5 mb-6">
              <p>
                <a
                  href="https://wa.me/5582996297278"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📞 (82) 99629-7278
                </a>
              </p>
              <p>
                <a
                  href="mailto:educaconsultoriaeservicos@gmail.com"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  ✉️ educaconsultoriaeservicos@gmail.com
                </a>
              </p>
            </address>

            {/* Social links */}
            <div className="flex gap-3" aria-label="Redes sociais">
              {SOCIAL_LINKS.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h4 className="font-bold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} Educa Consultoria e Serviços Ltda. Todos os direitos reservados.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Site seguro com criptografia SSL
          </p>
        </div>
      </div>
    </footer>
  );
}
