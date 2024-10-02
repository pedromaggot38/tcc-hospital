import { getTokenByUsername } from '@/data/token';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

export const generateVerificationToken = async (username: string) => {
    const token = uuidv4();

    const existingToken = await getTokenByUsername(username);

    if (existingToken){
        await db.token.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const verificationToken = await db.token.create({
        data: {
            username,
            token,
        }
    })

    return verificationToken
}