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
    username: z.string().min(6, {
        message: "Nome de usuário é obrigatório"
    }),
    password: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    role: z.enum(['root', 'admin', 'journalist']),
    isBlocked: z.boolean(),
    name: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    phone: z.string().max(12).min(8, {
        message: "Mínimo de 8 caracteres"
    }),
    email: z.string().email({
        message: "Digite um e-mail válido"
    }),
    image: z.string(),
})