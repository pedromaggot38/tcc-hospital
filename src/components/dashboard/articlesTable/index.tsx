import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { Articles, columns } from "./columns";

async function getData(): Promise<Articles[]> {
    const articles = await db.article.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content ?? undefined,
        published: article.published,
        slug: article.slug,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        user: article.user,
    }));
}
const ArticlesTable = async () => {
    const data = await getData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default ArticlesTable;
