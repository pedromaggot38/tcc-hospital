import { db } from "@/lib/db";

export const getTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.token.findUnique({ where: { token } });
        
        if (!verificationToken) {
            throw new Error('Token não encontrado.');
        }
        
        return verificationToken;
    } catch (error) {
        console.error("Erro ao buscar token:", error);
        return 'Erro ao buscar token ou nome de usuário não encontrado';
    }
}

export const getTokenByUsername = async (username: string) => {
    try {
        const verificationToken = await db.token.findFirst({ where: { username } });
        if (!verificationToken) {
            return null;
        }
        return verificationToken;
    } catch (error) {
        console.error("Erro ao buscar token:", error);
        return null;
    }
}
