'use server'

import { ConfigProfileSchema } from "@/schemas/auth/user"
import * as z from 'zod'

export const edit = async (values: z.infer<typeof ConfigProfileSchema>) => {
    
    
}