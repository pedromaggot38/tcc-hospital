'use server'

import { EditProfileSchema } from "@/schemas/auth/user"
import { db } from "@/lib/db"
import * as z from 'zod'

export const edit = async (values: z.infer<typeof EditProfileSchema>) => {
    
    
}