import * as z from 'zod'

export const LoginSchema = z.object({
    username: z.string().min(6, {
        message: "Usuário deve conter ao menos 6 caracteres"
    }),
    password: z.string().min(6, {
        message: "Senha é obrigatória"
    }),
})

export const RegisterSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(6),
    role: z.enum(['root', 'admin', 'journalist']),
    isBlocked: z.boolean(),
    name: z.string().min(6),
    phone: z.number().max(12).min(8),
    email: z.string().email(),
})