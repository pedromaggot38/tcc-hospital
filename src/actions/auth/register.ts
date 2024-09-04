'use server'

import { RegisterSchema } from "@/schemas/auth/user"
import { db } from "@/lib/db"
import * as z from 'zod'

const bcrypt = require('bcryptjs')

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log("teste" + values)

    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    /*  Recebe os dados nas variáveis */
    const {
        username, password, role, isBlocked, name, phone, email, image
    } = validatedFields.data

    /*  Verificação dos dados únicos */
    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { username: username },
                { phone: phone },
                { email: email }
            ]
        }
    });

    if (existingUser) {
        if (existingUser.username === username) {
            return { error: 'Nome de usuário em uso!' }
        }
        if (existingUser.phone === phone) {
            return { error: 'Telefone em uso!' }
        }
        if (existingUser.email === email) {
            return { error: 'E-mail em uso!' }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await db.user.create({
        data: {
            username,
            password: hashedPassword,
            role,
            isBlocked,
            name,
            phone,
            email,
            image
        }
    })
    return { success: "Usuário criado!" }
}