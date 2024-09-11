import { db } from "@/lib/db";
import { NextPage } from 'next';
import { notFound } from 'next/navigation';

interface Params {
    slug: string;
}

const ArticlePage: NextPage<{ params: Params }> = async ({ params }) => {
    const article = await db.article.findUnique({
        include: {
            user: true,
        },
        where: {
            slug: params.slug,
        },
    });

    if (!article) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Título: {article.title}</h1>
            <p>Conteúdo: {article.content}</p>
            <p>Publicado: {article.published ? "Sim" : "Não"}</p>
            <p>Autor: {article.user.name}</p>
        </div>
    );
};

export default ArticlePage;
