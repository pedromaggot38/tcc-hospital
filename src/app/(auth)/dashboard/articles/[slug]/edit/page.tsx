import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { ArticleEditSchema } from "@/schemas/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";

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



    if (!article) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center">
            <span>Título: </span>
            <Input
                placeholder=""
                defaultValue={article.title}
            />
            <p>Conteúdo: {article.content}</p>
            <p>Publicado: {article.published ? "Sim" : "Não"}</p>
            <p>Autor: {article.user.name}</p>
        </div>
    );
};

export default ArticlePage;
