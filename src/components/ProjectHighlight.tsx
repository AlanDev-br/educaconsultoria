"use client";

import { useEffect, useRef } from "react";

const PROJECT_NUMBERS = [
  { value: "6.620", label: "Vagas ofertadas", icon: "🎓" },
  { value: "5.851", label: "Inscritos",        icon: "📝" },
  { value: "4.768", label: "Participantes",    icon: "👩‍🏫" },
  { value: "81,5%", label: "Presença média",   icon: "📊" },
  { value: "119",   label: "Turmas",           icon: "🏫" },
  { value: "323",   label: "Encontros formativos", icon: "📅" },
];

const OPERATIONAL_ROLES = [
  {
    icon: "📜",
    title: "Emissão de Certificados",
    desc: "Controle e emissão de todos os certificados dos cursistas ao longo do programa.",
  },
  {
    icon: "🍽️",
    title: "Gestão da Alimentação",
    desc: "Controle e organização da alimentação nos locais de formação para todos os participantes.",
  },
  {
    icon: "✅",
    title: "Controle de Frequência",
    desc: "Registro e monitoramento da frequência de todos os cursistas em cada encontro formativo.",
  },
  {
    icon: "🎧",
    title: "Suporte aos Cursistas",
    desc: "Atendimento direto aos cursistas, esclarecimento de dúvidas e acompanhamento durante as formações.",
  },
  {
    icon: "🤝",
    title: "Apoio aos Formadores",
    desc: "Suporte logístico e administrativo completo aos formadores em todos os polos e encontros.",
  },
];

const TOP_AREAS = [
  { area: "Educação Especial",  participants: "1.367 participantes", bar: 100 },
  { area: "Educação Infantil",  participants: "966 participantes",   bar: 70  },
  { area: "Direitos Humanos",   participants: "539 participantes",   bar: 39  },
];

const PRESENCE_CARDS = [
  { area: "Educação Integral",  pct: "106%" },
  { area: "Nutrição Escolar",   pct: "100%" },
  { area: "Educação Especial",  pct: "84%"  },
  { area: "Educação Infantil",  pct: "83%"  },
];

export default function ProjectHighlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    const targets = sectionRef.current?.querySelectorAll(".reveal, .reveal-right") ?? [];
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projeto"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0B2D6B" }}
      aria-label="Projeto em destaque: Formação Continuada Semed Maceió"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border border-brand-green/40 bg-brand-green/10">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-slow" aria-hidden="true" />
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
              Projeto em Destaque
            </span>
          </div>

          <h2 className="reveal delay-100 text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">
            Formação Continuada{" "}
            <span className="text-brand-green">Semed Maceió</span>
          </h2>
          <p className="reveal delay-100 text-white/60 text-2xl sm:text-3xl font-bold mb-4">
            2024 / 2025
          </p>

          <p className="reveal delay-200 text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            A <strong className="text-white">Educa Consultoria</strong> foi contratada como executora
            operacional deste programa de formação de professores da Rede Municipal de Maceió —
            garantindo que cada detalhe administrativo e logístico funcionasse com excelência.
          </p>
        </div>

        <div className="reveal delay-300 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {PROJECT_NUMBERS.map((n) => (
            <div
              key={n.label}
              className="glass rounded-2xl p-5 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-3xl mb-2" aria-hidden="true">{n.icon}</div>
              <div className="text-2xl lg:text-3xl font-black text-white mb-1">{n.value}</div>
              <p className="text-white/50 text-xs leading-tight">{n.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          <div>
            <h3 className="reveal text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-brand-green inline-block" aria-hidden="true" />
              O que a Educa executou
            </h3>

            <div className="space-y-4">
              {OPERATIONAL_ROLES.map((role, i) => (
                <div
                  key={role.title}
                  className={`reveal delay-${(i + 1) * 100} glass rounded-2xl p-5 flex gap-4 items-start hover:bg-white/15 transition-colors`}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{role.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{role.title}</p>
                    <p className="text-white/55 text-xs leading-relaxed">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="reveal text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-brand-green inline-block" aria-hidden="true" />
              Maiores alcances
            </h3>

            <div className="space-y-4 mb-8">
              {TOP_AREAS.map((item, i) => (
                <div key={item.area} className={`reveal delay-${(i + 1) * 100}`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white text-sm font-semibold">{item.area}</span>
                    <span className="text-brand-green text-sm font-bold">{item.participants}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-green rounded-full"
                      style={{ width: `${item.bar}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="reveal text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-brand-green inline-block" aria-hidden="true" />
              Presença nas áreas
            </h3>
            <div className="reveal delay-200 grid grid-cols-2 gap-3">
              {PRESENCE_CARDS.map((p) => (
                <div key={p.area} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-brand-green mb-1">{p.pct}</div>
                  <p className="text-white/55 text-xs">{p.area}</p>
                </div>
              ))}
            </div>

            <div className="reveal delay-300 mt-6 glass rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/70 text-sm">Polos fixos</span>
                <span className="text-white font-bold">269 formações</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/70 text-sm">Polos volantes</span>
                <span className="text-white font-bold">54 formações</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white/70 text-sm font-semibold">Total Formações Presenciais</span>
                <span className="text-brand-green font-black text-lg">323</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
