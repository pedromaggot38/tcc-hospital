import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user
    } catch {
        return null
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.user.findUnique({ where: { username } })
        return user
    } catch {
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        return user
    } catch {
        return null
    }
}

export const getUserByPhone = async (phone: string) => {
    try {
        const user = await db.user.findUnique({ where: { phone } })
        return user
    } catch {
        return null
    }
}