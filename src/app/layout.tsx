import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Educa Consultoria e Serviços | Transformando Conhecimento em Resultados",
  description:
    "A Educa Consultoria e Serviços Ltda oferece treinamentos, consultoria pedagógica, design, tradução e produção musical. Maceió – AL. (82) 99629-7278.",
  keywords:
    "consultoria educacional, treinamento, consultoria pedagógica, design, tradução, produção musical, Maceió, Alagoas",
  openGraph: {
    title: "Educa Consultoria e Serviços",
    description: "Transformando Conhecimento em Resultados — Maceió, AL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
