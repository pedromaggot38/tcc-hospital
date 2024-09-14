'use server'

import { db } from "@/lib/db"
import * as z from 'zod'
import { PasswordUpdateSchema } from "@/schemas/auth/user"

const bcrypt = require('bcryptjs')
export const passwordUpdate = async (userId: string, values: z.infer<typeof PasswordUpdateSchema>) => {

    const validatedFields = PasswordUpdateSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    const { password, newPassword } = validatedFields.data

    const user = await db.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return { error: "Usuário não encontrado" }
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isCurrentPasswordCorrect) {
        return { error: "Senha atual incorreta" }
    }

    const isNewPasswordSameAsCurrent = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSameAsCurrent) {
        return { error: "A nova senha não pode ser a mesma que a senha atual" }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    try {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedNewPassword
            }
        })
    } catch (error) {
        return { error: "Erro ao alterar a senha" }
    }
    return { success: "Senha alterada!" }
}