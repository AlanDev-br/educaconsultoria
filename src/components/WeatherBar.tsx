"use client";

import { useEffect, useState } from "react";

// Maceió – AL coordinates
const LAT = -9.6658;
const LON = -35.735;

// Open-Meteo public API — free, no key required
// Docs: https://open-meteo.com/en/docs
const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m` +
  `&timezone=America%2FSao_Paulo` +
  `&forecast_days=1`;

const REFRESH_INTERVAL = 30 * 60 * 1_000; // 30 minutes

/** WMO Weather interpretation codes → Portuguese label + emoji */
const WEATHER_CODE: Record<number, { label: string; icon: string }> = {
  0:  { label: "Céu Limpo",             icon: "☀️"  },
  1:  { label: "Poucas Nuvens",          icon: "🌤️" },
  2:  { label: "Parcialmente Nublado",   icon: "⛅"  },
  3:  { label: "Nublado",                icon: "☁️"  },
  45: { label: "Neblina",                icon: "🌫️" },
  48: { label: "Neblina",                icon: "🌫️" },
  51: { label: "Garoa Leve",             icon: "🌦️" },
  53: { label: "Garoa",                  icon: "🌦️" },
  55: { label: "Garoa Intensa",          icon: "🌦️" },
  61: { label: "Chuva Leve",             icon: "🌧️" },
  63: { label: "Chuva",                  icon: "🌧️" },
  65: { label: "Chuva Intensa",          icon: "🌧️" },
  71: { label: "Neve",                   icon: "❄️"  },
  73: { label: "Neve",                   icon: "❄️"  },
  75: { label: "Neve Intensa",           icon: "❄️"  },
  77: { label: "Granizo",                icon: "🌨️" },
  80: { label: "Pancadas Leves",         icon: "🌦️" },
  81: { label: "Pancadas de Chuva",      icon: "🌦️" },
  82: { label: "Pancadas Intensas",      icon: "⛈️"  },
  95: { label: "Tempestade",             icon: "⛈️"  },
  96: { label: "Tempestade",             icon: "⛈️"  },
  99: { label: "Tempestade c/ Granizo",  icon: "⛈️"  },
};

function getWeatherInfo(code: number) {
  return WEATHER_CODE[code] ?? { label: "Tempo variável", icon: "🌡️" };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

interface WeatherData {
  temperature: number;
  apparentTemp: number;
  code: number;
  windspeed: number;
}

export default function WeatherBar() {
  const [weather,  setWeather]  = useState<WeatherData | null>(null);
  const [time,     setTime]     = useState("");
  const [error,    setError]    = useState(false);

  async function fetchWeather() {
    try {
      const res = await fetch(WEATHER_URL, { next: { revalidate: 0 } });
      if (!res.ok) throw new Error("API unavailable");
      const json = await res.json();
      const c = json.current;
      setWeather({
        temperature:   Math.round(c.temperature_2m),
        apparentTemp:  Math.round(c.apparent_temperature),
        code:          c.weathercode,
        windspeed:     Math.round(c.windspeed_10m),
      });
      setError(false);
    } catch {
      // Fail silently — bar becomes time-only; doesn't break the page
      setError(true);
    }
  }

  useEffect(() => {
    // Set initial time immediately to avoid flash
    setTime(formatTime(new Date()));
    fetchWeather();

    // Update clock every minute
    const clockInterval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 60_000);

    // Refresh weather data every 30 minutes
    const weatherInterval = setInterval(fetchWeather, REFRESH_INTERVAL);

    return () => {
      clearInterval(clockInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  const info = weather ? getWeatherInfo(weather.code) : null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-8"
      style={{ background: "#EDE5D8", borderBottom: "1px solid #D6C9B4" }}
      role="complementary"
      aria-label="Previsão do tempo em Maceió"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]" aria-hidden="true">📍</span>
          <span
            className="text-[11px] font-medium"
            style={{ color: "#6B5E4E" }}
          >
            Maceió, AL
          </span>
        </div>

        {/* Weather + time */}
        <div
          className="flex items-center gap-3 text-[11px] font-medium"
          style={{ color: "#6B5E4E" }}
        >
          {info && !error ? (
            <>
              <span
                className="hidden sm:flex items-center gap-1"
                aria-label={`Condição: ${info.label}`}
              >
                <span aria-hidden="true">{info.icon}</span>
                <span>{info.label}</span>
              </span>

              <span
                className="hidden sm:inline"
                style={{ color: "#B8A898" }}
                aria-hidden="true"
              >
                |
              </span>

              <span aria-label={`Temperatura: ${weather!.temperature}°C`}>
                🌡️ {weather!.temperature}°C
                <span
                  className="hidden md:inline"
                  style={{ color: "#9C8D7F" }}
                >
                  {" "}(sensação {weather!.apparentTemp}°C)
                </span>
              </span>

              <span
                style={{ color: "#B8A898" }}
                aria-hidden="true"
              >
                |
              </span>

              <span
                className="hidden md:flex items-center gap-1"
                aria-label={`Vento: ${weather!.windspeed} km/h`}
              >
                💨 {weather!.windspeed} km/h
              </span>

              <span
                className="hidden md:inline"
                style={{ color: "#B8A898" }}
                aria-hidden="true"
              >
                |
              </span>
            </>
          ) : null}

          {/* Clock — always visible */}
          {time && (
            <span aria-label={`Horário: ${time}`}>
              🕐 {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
