import * as z from 'zod'

export const LoginSchema = z.object({
    username: z.string().min(6, {
        message: "Usuário deve conter ao menos 6 caracteres"
    }).regex(/^\S*$/, {
        message: "Usuário não pode conter espaços"
    }),
    password: z.string().min(6, {
        message: "Senha deve conter ao menos 6 caracteres"
    }),
})

export const RegisterSchema = z.object({
    username: z.string().min(6, {
        message: "Nome de usuário é obrigatório"
    }).regex(/^\S*$/, {
        message: "Usuário não pode conter espaços"
    }),
    password: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    role: z.enum(['root', 'admin', 'journalist']),
    isBlocked: z.boolean(),
    name: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }).optional(),
    phone: z.string().max(12).min(8, {
        message: "Mínimo de 8 caracteres"
    }).optional(),
    email: z.string().email({
        message: "Digite um e-mail válido"
    }).optional(),
    image: z.string().optional(),
});

export const UserEditSchema = z.object({
    username: z.string().min(6, {
        message: "Nome de usuário é obrigatório"
    }).regex(/^\S*$/, {
        message: "Usuário não pode conter espaços"
    }),
    name: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    phone: z.string().max(12).min(8, {
        message: "Mínimo de 8 caracteres"
    }).optional(),
    email: z.string().email({
        message: "Digite um e-mail válido"
    }).optional(),
    image: z.string().optional(),
});

export const SettingsEditSchema = z.object({
    name: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }).optional(),
    image: z.string().optional(),
    email: z.string().email({
        message: "Digite um e-mail válido"
    }).optional(),
    phone: z.string().max(12).min(8, {
        message: "Mínimo de 8 caracteres"
    }).optional(),
});

export const PasswordUpdateSchema = z.object({
    password: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    newPassword: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
    confirmPassword: z.string().min(6, {
        message: "Mínimo de 6 caracteres"
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não se correspondem",
    path: ['confirmPassword'],
});