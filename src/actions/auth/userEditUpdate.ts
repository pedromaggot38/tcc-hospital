'use server'

import { UserEditSchema } from '@/schemas/auth/user';
import { db } from "@/lib/db"
import * as z from 'zod'

export const userEditUpdate = async (username: string, values: z.infer<typeof UserEditSchema>) => {
    const validatedFields = UserEditSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" };
    }

    const { name, role, email, phone, image, isBlocked } = validatedFields.data;

    const currentUser = await db.user.findUnique({
        where: { username }
    });

    if (!currentUser) {
        return { error: "Usuário não encontrado." };
    }

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { phone: phone },
                { email: email },
            ],
            NOT: { id: currentUser.id }
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
                username: username
            },
            data: {
                name,
                role,
                phone,
                image,
                isBlocked,
                email,
            }
        });
    } catch (error) {
        return { error: "Erro ao atualizar os dados" };
    }
    return { success: "Dados atualizados!" };
};
