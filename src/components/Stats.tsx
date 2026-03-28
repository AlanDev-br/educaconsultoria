"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 4768, suffix: "+",  label: "Professores Formados",       icon: "👩‍🏫" },
  { value: 323,  suffix: "",   label: "Encontros Formativos",        icon: "📅" },
  { value: 81,   suffix: "%",  label: "Presença Média nos Cursos",   icon: "📊" },
  { value: 119,  suffix: "",   label: "Turmas Coordenadas",          icon: "🏫" },
];

/** Animates a number from 0 to `target` using an ease-out cubic curve. */
function useCountUp(target: number, started: boolean, duration = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started || target === 0) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, started);

  return (
    <div className="text-center group">
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block" aria-hidden="true">
        {stat.icon}
      </div>

      <div className="text-4xl lg:text-5xl font-black text-white mb-1">
        {count.toLocaleString("pt-BR")}
        <span className="text-brand-green">{stat.suffix}</span>
      </div>

      <p className="text-white/60 text-sm">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  /* Trigger count-up only once, when the section enters the viewport. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section
      id="resultados"
      ref={ref}
      className="hero-bg py-20 lg:py-28 relative overflow-hidden"
      aria-label="Nossos números"
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
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Resultados que falam por si
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Números reais do nosso maior projeto: a Formação Continuada da Semed Maceió 2024/2025,
            onde a Educa atuou como executora operacional.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>

        {/* Highlight strip — main project */}
        <div className="glass rounded-2xl p-6 lg:p-8 text-center max-w-3xl mx-auto">
          <p className="text-white/90 text-lg font-medium leading-relaxed">
            🏆 <strong>Formação Continuada Semed Maceió — 2024/2025</strong> — a Educa foi
            a executora operacional de um dos maiores programas de formação de professores
            da rede municipal, com <strong className="text-brand-green">6.620 vagas ofertadas</strong> e{" "}
            <strong className="text-brand-green">323 encontros formativos</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
