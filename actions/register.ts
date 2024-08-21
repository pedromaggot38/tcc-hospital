'use server'

import { RegisterSchema } from "@/schemas/auth/user"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values)

    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Dados incorretos"}

    }

    return { success: "Tudo certo!" }
}