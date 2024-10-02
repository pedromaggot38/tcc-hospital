'use server'

import { db } from "@/lib/db"
import { SettingsEditSchema } from "@/schemas/auth/user"
import * as z from 'zod'

export const userUpdate = async (userId: string, values: z.infer<typeof SettingsEditSchema>) => {

    const validatedFields = SettingsEditSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    const { name, phone, email, image } = validatedFields.data

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { phone: phone },
                { email: email }
            ],
            NOT: { id: userId }
        }
    });

    if (existingUser) {
        if (existingUser.phone === phone) {
            return { error: 'Telefone em uso!' }
        }
        if (existingUser.email === email) {
            return { error: 'E-mail em uso!' }
        }
    }

    try {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                phone,
                email,
                image
            }
        })
    } catch (error) {
        return { error: "Erro ao atualizar os dados" }
    }
    return { success: "Dados atualizados!" }
}