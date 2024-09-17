'use server'

import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokenGenerate"
import { PasswordResetSchema } from "@/schemas/auth/user"

const bcrypt = require('bcryptjs')

export const passwordReset = async (values: { username: string; newPassword: string; confirmNewPassword: string }) => {

    const validatedFields = PasswordResetSchema.safeParse({
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword
    });

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    const { newPassword } = validatedFields.data;

    const { username } = values;

    const user = await db.user.findUnique({
        where: { username: username }
    });

    if (!user) {
        return { error: "Usuário não encontrado" }
    }

    const isNewPasswordSameAsCurrent = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSameAsCurrent) {
        return { error: "A nova senha não pode ser a mesma que a senha atual" }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    try {
        await db.user.update({
            where: {
                username: username
            },
            data: {
                password: hashedNewPassword
            }
        })
    } catch (error) {
        return { error: "Erro ao alterar a senha" }
    }

    const verificationToken = await generateVerificationToken(username)

    return { success: "Senha alterada!" }
}
