import { db } from "@/lib/db";

export const getTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.token.findUnique({ where: { token } })
        return verificationToken
    } catch {
        return 'Error during searching token or username not found'
    }
}

export const getTokenByUsername = async (username: string) => {
    try {
        const verificationToken = await db.token.findFirst({ where: { username } })
        return verificationToken
    } catch {
        return 'Error during searching token or username not found'
    }
}