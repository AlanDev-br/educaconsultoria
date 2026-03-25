"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Início",     href: "#hero"      },
  { label: "Serviços",   href: "#servicos"  },
  { label: "Sobre",      href: "#sobre"     },
  { label: "Resultados", href: "#resultados"},
  { label: "Contato",    href: "#contato"   },
] as const;

/** Pixel offset after which the header switches to its "scrolled" style. */
const SCROLL_THRESHOLD = 20;

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Attach a passive scroll listener to avoid blocking the main thread. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string): void {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg shadow-brand-blue/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
            aria-label="Voltar ao início"
          >
            <Image
              src="/educa-logo.jpeg"
              alt="Educa Consultoria e Serviços"
              width={160}
              height={48}
              className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {label}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full" aria-hidden="true" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contato")}
              className="btn-shine bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/30"
            >
              Fale Conosco
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 flex flex-col gap-1.5" aria-hidden="true">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2"  : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0"               : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2": ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Menu mobile"
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-dark border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              className="text-white/80 hover:text-white text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-left"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contato")}
            className="mt-2 btn-shine bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-3 rounded-full transition-all"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </header>
  );
}
