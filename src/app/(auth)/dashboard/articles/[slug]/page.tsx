
import EditArticleForm from "@/components/forms/edit-article-form";
import { db } from "@/lib/db";
import { NextPage } from 'next';
import { notFound } from 'next/navigation';

interface Params {
    slug: string;
}

const ArticlePage: NextPage<{ params: Params }> = async ({ params }) => {
    const article = await db.article.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            user: true,
        },
    });

    if (!article) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center">
            <EditArticleForm article={article} originalSlug={article.slug} />
        </div>
    );
};

export default ArticlePage;