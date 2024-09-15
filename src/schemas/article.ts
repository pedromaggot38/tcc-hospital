import * as z from 'zod'

export const ArticleSchema = z.object({
    title: z.string()
        .min(1, "O título é obrigatório")
        .max(255, "O título não pode ter mais de 255 caracteres"),

    slug: z.string()
        .min(1, "O slug é obrigatório")
        .max(100, "O slug não pode ter mais de 100 caracteres")
        .transform((val) => val.replace(/\s+/g, '-')),
    content: z.string().optional(),
    published: z.boolean(),
});

export const ArticleEditSchema = z.object({
    title: z.string()
        .min(1, "O título é obrigatório")
        .max(255, "O título não pode ter mais de 255 caracteres"),
    slug: z.string()
        .min(1, "O slug é obrigatório")
        .max(100, "O slug não pode ter mais de 100 caracteres")
        .transform((val) => val.replace(/\s+/g, '-')),
    content: z.string().optional(),
    published: z.boolean(),
});