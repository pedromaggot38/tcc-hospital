import { db } from "@/lib/db";

export const getUserById = async (id: string | undefined) => {
    if (!id) {
        console.error("ID is undefined or empty");
        return null;
    }
    
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
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