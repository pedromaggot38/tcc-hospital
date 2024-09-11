import * as z from 'zod'

export const ArticleSchema = z.object({
    title: z.string()
        .min(1, "O título é obrigatório")
        .max(255, "O título não pode ter mais de 255 caracteres"),

    slug: z.string()
        .min(1, "O slug é obrigatório")
        .max(100, "O slug não pode ter mais de 100 caracteres")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hífens"),

    content: z.string().optional(),
    published: z.boolean(),
});