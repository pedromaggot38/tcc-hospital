'use server'
import { LoginSchema } from "@/schemas/auth/user"
import { signIn } from "@/../auth"
import * as z from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/../routes"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values)

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Dados incorretos" }
    }
    const { username, password } = validatedFields.data;

    try {
        await signIn("credentials",{
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        
    }
}