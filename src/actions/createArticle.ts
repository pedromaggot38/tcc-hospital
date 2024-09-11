'use server'

import * as z from 'zod'
import { db } from "@/lib/db"
import { auth } from '../../auth';
import { ArticleSchema } from "@/schemas/article"


export const createArticle = async (values: z.infer<typeof ArticleSchema>) => {
    const session = await auth();
    const validatedFields = ArticleSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Erro ao validar os campos" }
    }

    const { title, slug, published, content } = validatedFields.data

    const existingArticle = await db.article.findFirst({
        where: {
            OR: [
                { title: title },
                { slug: slug },
            ]
        }
    })

    if (existingArticle) {
        if (existingArticle.title === title) {
            return { error: 'Título já existe!' }
        }
        if (existingArticle.slug === slug) {
            return { error: 'Slug já existe!' }
        }
    }

    await db.article.create({
        data: {
            slug,
            title,
            content,
            published,
            user: {
                connect: {
                    id: session?.user.id
                }
            }
        }
    })

    return { success: "Notícia criada!" }
}