import { z } from "zod";

/**
 * Schema used by both the API route (authoritative) and the client
 * (for UX feedback). The API route always re-validates — never trust
 * the frontend to enforce these rules.
 */
export const contactSchema = z.object({
  name: z
    .string()
    // \p{L} matches Unicode letters, covering accented characters (é, ã, ç…)
    .regex(/^[\p{L}\s'-]+$/u, "Nome contém caracteres inválidos")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),

  email: z
    .string()
    .email("E-mail inválido")
    .max(254, "E-mail muito longo") // RFC 5321 maximum
    .toLowerCase(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s()\-+]{8,20}$/.test(val),
      "Telefone inválido"
    ),

  company: z
    .string()
    .max(150, "Nome da empresa muito longo")
    .optional(),

  service: z.enum(
    ["treinamento", "consultoria", "traducao", "design", "portal", "musical", "outro"],
    { errorMap: () => ({ message: "Selecione um serviço válido" }) }
  ),

  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa"),
});

export type ContactInput = z.infer<typeof contactSchema>;
