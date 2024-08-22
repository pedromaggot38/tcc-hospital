import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Exemplo com Google, pode adicionar outros

export const authConfig: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // Adicione outros provedores aqui, se necessário
    ],
    pages: {
        signIn: '/login', 
    },

};
