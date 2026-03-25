<div align="center">

# Educa Consultoria — Landing Page

**Landing page institucional moderna, segura e responsiva**
construída com Next.js 16, TypeScript e Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-3.23-3068b7)](https://zod.dev)
[![Vulnerabilities](https://img.shields.io/badge/vulnerabilities-0-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Técnica](#stack-técnica)
- [Segurança](#segurança)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Deploy](#deploy)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Visão Geral

Landing page institucional da **Educa Consultoria e Serviços Ltda** (Maceió – AL), desenvolvida com foco em três pilares:

| Pilar           | Decisões                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Performance** | Geração estática da página principal (SSG), imagens otimizadas com `next/image`, CSS animations sem JS externo          |
| **Segurança**   | Validação server-side com Zod, rate limiting por IP, headers HTTP de segurança, nenhuma lógica crítica no frontend      |
| **Experiência** | Design responsivo mobile-first, animações por IntersectionObserver, scroll suave, formulário com feedback em tempo real |

---

## Funcionalidades

- **Header fixo** com navegação por âncoras e menu hamburger animado
- **Hero section** com animações CSS, floating cards e CTAs
- **6 cards de serviços** com hover effects e animações ao scroll
- **Seção de números** com counter animado ativado por IntersectionObserver
- **Seção Sobre** com missão, visão, valores e diferenciais
- **Formulário de contato** com:
  - Validação client-side (UX) e server-side (segurança)
  - Rate limiting: 5 requisições / 15 minutos por IP
  - Estados de loading, sucesso e erro
  - Links clicáveis para WhatsApp e e-mail
- **Footer** com links e contatos clicáveis

---

## Stack Técnica

```
Framework   Next.js 16 (App Router)
Linguagem   TypeScript 5 (strict mode)
Estilo      Tailwind CSS 3.4
Validação   Zod 3.23
E-mail      Nodemailer 8 (configurável via .env)
```

**Sem dependências de UI** — todos os componentes e animações são escritos do zero, sem Framer Motion, shadcn ou similares. Isso mantém o bundle enxuto e o projeto sem acoplamento com bibliotecas de terceiros.

---

## Segurança

A aplicação foi construída com o princípio de **nunca confiar no frontend**. Todas as entradas do usuário são validadas no servidor.

```
┌─────────────────────────────────────────────────┐
│  Camadas de defesa — POST /api/contact           │
├─────────────────────────────────────────────────┤
│  1. Rate Limiting     5 req / 15 min por IP      │
│  2. Content-Type      Rejeita não-JSON           │
│  3. Payload Size      Bloqueia > 10 KB           │
│  4. JSON Parsing      Erro isolado               │
│  5. Zod Schema        Validação de tipos e regex │
│  6. Log Sanitization  Previne log injection      │
│  7. HTTP Methods      Apenas POST permitido      │
└─────────────────────────────────────────────────┘
```

**HTTP Security Headers** configurados em `next.config.ts`:

| Header                    | Valor                                      |
| ------------------------- | ------------------------------------------ |
| `X-Frame-Options`         | `DENY` (anti-clickjacking)                 |
| `X-Content-Type-Options`  | `nosniff`                                  |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`          |
| `Permissions-Policy`      | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | Configurado por origem                     |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # API segura com validação server-side
│   ├── globals.css            # Design system, animações, utilitários
│   ├── layout.tsx             # Metadata, SEO, fonte Inter
│   └── page.tsx               # Composição das seções
│
├── components/
│   ├── Header.tsx             # Navbar responsiva com scroll detection
│   ├── Hero.tsx               # Hero section com animações CSS
│   ├── Services.tsx           # Grid dos 6 serviços
│   ├── Stats.tsx              # Contador animado por IntersectionObserver
│   ├── About.tsx              # Sobre, missão, visão e valores
│   ├── Contact.tsx            # Formulário com validação dupla
│   └── Footer.tsx             # Links, contatos e redes sociais
│
└── lib/
    ├── rateLimit.ts           # Rate limiter in-memory (trocar por Redis em prod)
    └── validations.ts         # Schema Zod compartilhado (cliente + servidor)
```

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js ≥ 18.17.0

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/educa-consultoria.git
cd educa-consultoria

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais SMTP

# 4. Rode em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

```bash
# Outros comandos úteis
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run typecheck  # Verificação de tipos TypeScript
```

---

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável               | Descrição                     | Obrigatório          |
| ---------------------- | ----------------------------- | -------------------- |
| `SMTP_HOST`            | Host do servidor SMTP         | Para envio de e-mail |
| `SMTP_PORT`            | Porta SMTP (ex: 587)          | Para envio de e-mail |
| `SMTP_USER`            | Usuário SMTP                  | Para envio de e-mail |
| `SMTP_PASS`            | Senha de app do SMTP          | Para envio de e-mail |
| `CONTACT_EMAIL`        | E-mail que recebe os contatos | Para envio de e-mail |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site           | Para Open Graph      |

> **Nota:** sem as variáveis SMTP configuradas, o formulário processa e valida normalmente, mas não envia e-mail. Os dados ficam registrados no log do servidor.

---

## Licença

MIT © [Educa Consultoria e Serviços Ltda](mailto:educaconsultoriaeservicos@gmail.com)
