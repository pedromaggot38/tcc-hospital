import { db } from "@/lib/db";

export async function getArticle() {
    const articleData = await db.article.findMany();
    return articleData
}

export async function updateArticle() {
    
}

export async function deleteArticle() {
    
}

export const getArticleById = async (id: string) => {
    try {
        const article = await db.article.findUnique({ where: { id } })
        return article
    } catch {
        return null
    }
}