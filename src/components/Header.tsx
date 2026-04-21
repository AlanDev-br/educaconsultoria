"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Início",     href: "#hero"       },
  { label: "Projeto",    href: "#projeto"    },
  { label: "Serviços",   href: "#servicos"   },
  { label: "Sobre",      href: "#sobre"      },
  { label: "Contato",    href: "#contato"    },
] as const;

const SCROLL_THRESHOLD = 20;

// ─── Weather ─────────────────────────────────────────────────────────────────

// Open-Meteo public API — free, no key required
// Maceió – AL: lat -9.6658, lon -35.7350
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-9.6658&longitude=-35.735" +
  "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m" +
  "&timezone=America%2FSao_Paulo&forecast_days=1";

const WEATHER_REFRESH = 30 * 60 * 1_000; // 30 min

/** WMO weather codes → emoji + short label */
const WEATHER_CODES: Record<number, { icon: string; label: string }> = {
  0:  { icon: "☀️",  label: "Céu Limpo"        },
  1:  { icon: "🌤️", label: "Poucas Nuvens"     },
  2:  { icon: "⛅",  label: "Parcialmente Nublado" },
  3:  { icon: "☁️",  label: "Nublado"            },
  45: { icon: "🌫️", label: "Neblina"            },
  48: { icon: "🌫️", label: "Neblina"            },
  51: { icon: "🌦️", label: "Garoa"              },
  53: { icon: "🌦️", label: "Garoa"              },
  55: { icon: "🌦️", label: "Garoa"              },
  61: { icon: "🌧️", label: "Chuva Leve"         },
  63: { icon: "🌧️", label: "Chuva"              },
  65: { icon: "🌧️", label: "Chuva Intensa"      },
  80: { icon: "🌦️", label: "Pancadas"           },
  81: { icon: "🌦️", label: "Pancadas"           },
  82: { icon: "⛈️",  label: "Pancadas Intensas" },
  95: { icon: "⛈️",  label: "Tempestade"         },
  96: { icon: "⛈️",  label: "Tempestade"         },
  99: { icon: "⛈️",  label: "Tempestade"         },
};

interface WeatherState {
  temp: number;
  code: number;
}

function getInfo(code: number) {
  return WEATHER_CODES[code] ?? { icon: "🌡️", label: "Variável" };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [weather, setWeather] = useState<WeatherState | null>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Weather — fetched on mount, refreshed every 30 min.
     AbortController cancels any in-flight request on unmount. */
  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const res = await fetch(WEATHER_URL, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const c = json.current;
        setWeather({
          temp: Math.round(c.temperature_2m),
          code: c.weather_code ?? c.weathercode ?? 0,
        });
      } catch {
        // Includes AbortError on unmount — fail silently either way
      }
    }

    fetchWeather();
    const refresh = setInterval(fetchWeather, WEATHER_REFRESH);
    return () => {
      clearInterval(refresh);
      controller.abort();
    };
  }, []);

  function handleNavClick(href: string): void {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  const info = weather ? getInfo(weather.code) : null;

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
              src="/educa-logo.png"
              alt="Educa Consultoria e Serviços"
              width={160}
              height={48}
              className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Menu principal">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full" aria-hidden="true" />
              </button>
            ))}

            {/* ── Weather widget — shown inline after nav links ── */}
            {info && (
              <div
                className="flex items-center gap-2 border-l border-white/20 pl-5 text-white/60 text-xs select-none"
                aria-label={`Tempo em Maceió: ${info.label}, ${weather!.temp}°C`}
              >
                <span aria-hidden="true">{info.icon}</span>
                <span className="hidden lg:inline">{info.label}</span>
                <span className="font-semibold text-white/80">
                  {weather!.temp}°C
                </span>
              </div>
            )}

            <button
              onClick={() => handleNavClick("#contato")}
              className="ml-2 btn-shine bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/30"
            >
              Fale Conosco
            </button>
          </nav>

          {/* Mobile: weather (if loaded) + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {info && (
              <span className="text-white/60 text-xs">
                {info.icon} {weather!.temp}°C
              </span>
            )}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 flex flex-col gap-1.5" aria-hidden="true">
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2"   : ""}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0"                : ""}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
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

          {/* Weather info inside mobile menu */}
          {info && (
            <div className="flex items-center gap-2 px-3 py-2 text-white/50 text-xs border-t border-white/10 mt-1 pt-3">
              <span>{info.icon}</span>
              <span>{info.label} · {weather!.temp}°C</span>
              <span className="ml-auto">📍 Maceió, AL</span>
            </div>
          )}

          <button
            onClick={() => handleNavClick("#contato")}
            className="mt-1 btn-shine bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-3 rounded-full transition-all"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </header>
  );
}
