import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user
    } catch {
        return null
    }
}

export const getUserIsBlocked = async (id: string | undefined): Promise<boolean | null> => {
    if (!id) {
        console.error("ID is undefined or empty");
        return null;
    }
    
    try {
        const user = await db.user.findUnique({ where: { id }, select: { isBlocked: true } });
        return user?.isBlocked ?? null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
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