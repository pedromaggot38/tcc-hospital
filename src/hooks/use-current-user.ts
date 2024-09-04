import { useSession } from "next-auth/react";
import { db } from "@/lib/db";

export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}

/*
export function useCurrent(userId: string) {
    return useQuery(['currentUser', userId], async () => {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { name: true, image: true }
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    });
}

*/