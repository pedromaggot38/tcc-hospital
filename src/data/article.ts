import { db } from "@/lib/db";

export const getArticleById = async (id: number) => {
    try {
        const article = await db.article.findUnique({ where: { id } })
        return article
    } catch {
        return null
    }
}

export const getArticleBySlug = async (slug: string) => {
    try {
        const article = await db.article.findFirst({ where: { slug } })
        return article
    } catch {
        return null
    }
}