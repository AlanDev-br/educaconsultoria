"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  {
    icon: "🎯",
    title: "Missão",
    text: "Transformar conhecimento em resultados reais, por meio de soluções educacionais, formativas e criativas que impactam pessoas, instituições e comunidades.",
  },
  {
    icon: "🔭",
    title: "Visão",
    text: "Ser referência em consultoria educacional e serviços integrados no Nordeste do Brasil, reconhecida pela excelência, inovação e compromisso com a transformação social.",
  },
  {
    icon: "💎",
    title: "Valores",
    text: "Educação como potência, ética em cada entrega, escuta sensível, inovação pedagógica e comprometimento com quem transforma o Brasil pelo conhecimento.",
  },
] as const;

const DIFFERENTIALS = [
  "Executora operacional da Formação Continuada Semed Maceió 2024/2025",
  "Controle de frequência, certificados e suporte a cursistas",
  "Apoio logístico completo a formadores em campo",
  "LabFor – Laboratório de Formação para professores",
  "Parceria com o Programa Sinpete – Ciência e Inovação",
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );

    const targets = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right") ?? [];
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-24 lg:py-32" style={{ background: "#F2EAD8" }} aria-label="Sobre a Educa Consultoria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left column: company story ── */}
          <div>
            <div className="reveal inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest">Sobre Nós</span>
            </div>

            <h2 className="reveal delay-100 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Educar é acender{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0B2D6B, #1848BB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                luzes
              </span>{" "}
              onde havia perguntas
            </h2>

            <p className="reveal delay-200 text-slate-500 text-lg leading-relaxed mb-6">
              A <strong className="text-slate-700">Educa Consultoria e Serviços Ltda</strong> nasceu
              em Maceió (AL) com um propósito claro: ser parceira de instituições, redes de ensino e
              projetos que acreditam no poder transformador da educação.
            </p>

            <p className="reveal delay-300 text-slate-500 text-lg leading-relaxed mb-6">
              Atuamos em formação de professores com metodologias ativas, programas de desenvolvimento
              profissional e gerencial, consultoria pedagógica, design, tradução e produção musical —
              integrando soluções criativas e educacionais em um só lugar.
            </p>

            {/* Institutional quote */}
            <blockquote className="reveal delay-400 text-slate-500 text-base leading-relaxed mb-8 italic border-l-4 border-brand-green pl-4">
              "Formar professores é muito mais do que repassar conteúdos: é inspirar, provocar sentido
              e fortalecer trajetórias."
            </blockquote>

            {/* Key differentials checklist */}
            <ul className="reveal delay-500 space-y-3" aria-label="Diferenciais">
              {DIFFERENTIALS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2DB84B" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right column: mission/vision/values + CTA ── */}
          <div className="space-y-5">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`reveal-right delay-${(i + 2) * 100} card-hover bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-5 items-start`}
              >
                <div className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: "#EDE5D8" }} aria-hidden="true">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{pillar.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pillar.text}</p>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div
              className="reveal-right delay-500 rounded-2xl p-6 text-white overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #0B2D6B, #1848BB)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
              <p className="font-bold text-lg mb-1 relative z-10">
                📍 Maceió – AL, atendendo todo o Brasil
              </p>
              <p className="text-white/70 text-sm mb-4 relative z-10">
                Entre em contato e descubra como podemos colaborar com sua instituição ou projeto.
              </p>
              <button
                onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-shine bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all relative z-10"
              >
                Vamos crescer juntos?
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
