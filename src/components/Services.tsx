"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
  /** Tailwind gradient classes for the top accent bar. */
  color: string;
  /** Hex color used for icon background tint and tag text. */
  accent: string;
}

const SERVICES: Service[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: "Desenvolvimento Profissional e Gerencial",
    description:
      "Programas de treinamento personalizados para equipes e lideranças. Desenvolvemos competências técnicas e comportamentais que geram impacto real nos resultados da sua organização.",
    tags: ["Liderança", "Gestão", "Soft Skills", "Formação"],
    color: "from-blue-600 to-blue-700",
    accent: "#1848BB",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Apoio à Educação",
    description:
      "Consultoria pedagógica especializada para instituições de ensino, redes municipais e programas educacionais, incluindo formação de professores com metodologias ativas e práticas inovadoras.",
    tags: ["Consultoria Pedagógica", "LabFor", "Metodologias Ativas", "MEC"],
    color: "from-brand-green to-green-600",
    accent: "#2DB84B",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Tradução e Interpretação",
    description:
      "Serviços profissionais de tradução e interpretação de documentos técnicos, educacionais e institucionais, garantindo precisão, fidelidade e qualidade em cada projeto.",
    tags: ["Documentos", "Técnico", "Institucional", "Precisão"],
    color: "from-amber-500 to-orange-600",
    accent: "#D97706",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "Design e Identidade Visual",
    description:
      "Criação de materiais visuais, identidade de marca e conteúdos gráficos para instituições, projetos educacionais, eventos e campanhas de comunicação.",
    tags: ["Identidade Visual", "Materiais", "Comunicação", "Branding"],
    color: "from-purple-600 to-indigo-700",
    accent: "#7C3AED",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Gestão de Conteúdos e Portais",
    description:
      "Gestão estratégica de conteúdos digitais e portais educacionais, garantindo organização, acessibilidade e experiência de aprendizagem de qualidade para os usuários.",
    tags: ["Portais", "EAD", "Conteúdo Digital", "Educação"],
    color: "from-cyan-500 to-blue-600",
    accent: "#0891B2",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    title: "Produção Musical",
    description:
      "Produção musical especializada para eventos institucionais, campanhas educativas e projetos culturais, agregando qualidade sonora e identidade às suas iniciativas.",
    tags: ["Eventos", "Campanhas", "Cultural", "Produção"],
    color: "from-rose-500 to-pink-600",
    accent: "#E11D48",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Reveal cards as they scroll into view using IntersectionObserver
     instead of a library, keeping the bundle lean. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );

    const targets = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="py-24 lg:py-32 dots-bg relative" aria-label="Nossos serviços">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest">O que fazemos</span>
          </div>
          <h2 className="reveal delay-100 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-5">
            Soluções completas para{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0B2D6B, #1848BB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              cada necessidade
            </span>
          </h2>
          <p className="reveal delay-200 text-slate-500 text-lg max-w-2xl mx-auto">
            Da formação de professores à produção musical — combinamos expertise multidisciplinar
            para entregar resultados que realmente transformam.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <article
              key={service.title}
              className={`reveal delay-${(i % 3 + 1) * 100} card-hover group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 relative overflow-hidden`}
            >
              {/* Colored top bar identifies the service category */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} aria-hidden="true" />

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ background: `${service.accent}15`, color: service.accent }}
                aria-hidden="true"
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: `${service.accent}12`, color: service.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="mt-6 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: service.accent }}
                aria-hidden="true"
              >
                Saiba mais
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
