'use server'

import { db } from "@/lib/db"
import { TokenVerificationSchema } from "@/schemas/auth/user"
import * as z from 'zod'

export const tokenVerification = async (values: z.infer<typeof TokenVerificationSchema>) => {
    const validatedFields = TokenVerificationSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    const { username, token } = validatedFields.data

    try {
        const existingToken = await db.token.findFirst({
            where: {
                username: username,
                token: token,
            }
        });

        if (!existingToken) {
            return { error: "Usuário ou token inválido" };
        }

        return { success: "Token e username verificados com sucesso, redefina sua senha" }
    } catch (error) {
        console.error("Erro ao verificar token", error);
        return { error: "Erro ao verificar o token" };
    }
}
