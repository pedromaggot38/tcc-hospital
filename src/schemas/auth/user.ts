import { z } from 'zod'

export const CredentialsSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(8),
})

export const RegisterSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(8),
    role: z.enum(['root', 'admin', 'journalist']),
    isBlocked: z.boolean(),
    name: z.string().min(6),
    phone: z.number().max(12).min(8),
    email: z.string().email(),
})