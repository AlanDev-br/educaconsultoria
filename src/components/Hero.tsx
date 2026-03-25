"use client";

import Image from "next/image";

/** Smooth-scrolls to a section by its CSS selector. */
function scrollTo(selector: string): void {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-bg noise min-h-screen flex items-center relative overflow-hidden"
      aria-label="Início"
    >
      {/* Radial glow — purely decorative */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-10 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2DB84B 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Text content ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
              style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}
            >
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-slow" aria-hidden="true" />
              <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
                Consultoria Especializada
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6"
              style={{ animation: "fadeUp 0.6s ease-out 0.2s both" }}
            >
              Transformando{" "}
              <span className="gradient-text">Conhecimento</span>
              <br />
              em Resultados
            </h1>

            <p
              className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ animation: "fadeUp 0.6s ease-out 0.35s both" }}
            >
              Soluções completas em educação corporativa, consultoria pedagógica,
              design, tradução e produção musical — para instituições e projetos
              que fazem a diferença em Maceió e em todo o Brasil.
            </p>

            {/* Primary + secondary CTA */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ animation: "fadeUp 0.6s ease-out 0.5s both" }}
            >
              <button
                onClick={() => scrollTo("#contato")}
                className="btn-shine bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-brand-green/40 hover:scale-105"
              >
                Fale com um Especialista
              </button>
              <button
                onClick={() => scrollTo("#servicos")}
                className="glass hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
              >
                Nossos Serviços →
              </button>
            </div>

            {/* Quick stats strip */}
            <div
              className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start"
              style={{ animation: "fadeUp 0.6s ease-out 0.65s both" }}
            >
              {[
                { value: "6+", label: "Áreas de Atuação" },
                { value: "AL", label: "Maceió — Brasil" },
                { value: "∞", label: "Compromisso com Educação" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-white/50 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visual / logo card ── */}
          <div
            className="flex-1 flex justify-center items-center"
            style={{ animation: "fadeIn 0.8s ease-out 0.4s both" }}
          >
            <div className="relative">
              {/* Soft glow behind the card */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-brand-blue-light/20 rounded-3xl blur-3xl scale-110"
              />

              <div className="relative glass rounded-3xl p-8 lg:p-10 max-w-sm w-full">
                <Image
                  src="/educa-logo.jpeg"
                  alt="Educa Consultoria e Serviços"
                  width={420}
                  height={140}
                  className="w-full h-auto object-contain rounded-xl"
                  priority
                />

                {/* Floating badge — top right */}
                <div
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 glass rounded-2xl px-4 py-3"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-white text-xs font-bold">Excelência</p>
                      <p className="text-white/60 text-[10px]">em Educação</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge — bottom left */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 -left-6 glass rounded-2xl px-4 py-3"
                  style={{ animation: "float 3s ease-in-out infinite 1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">Nova parceria</p>
                      <p className="text-white/60 text-[10px]">Maceió – AL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        aria-hidden="true"
      >
        <span className="text-white text-xs">Role para baixo</span>
        <div className="w-5 h-8 border border-white/40 rounded-full flex items-start justify-center p-1">
          <div
            className="w-1 h-2 bg-white rounded-full"
            style={{ animation: "float 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
