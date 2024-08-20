'use server'

import { LoginSchema } from "@/schemas/auth/user"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values)

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Dados incorretos"}

    }

    return { success: "Tudo certo!" }
}