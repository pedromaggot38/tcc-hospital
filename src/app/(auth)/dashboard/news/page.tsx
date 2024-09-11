import ArticlesTable from "@/components/dashboard/articlesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const News = () => {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Notícias</h1>
                    <Button
                    asChild
                    >
                        <Link
                            key="Nova Publicação"
                            href="/dashboard/news/new-post/"
                        >
                            <span>Novo Post</span>
                            <span className="sr-only">Nova Publicação</span>
                        </Link>
                    </Button>
                </div>

                <Card className="w-full">
                    <CardContent className="font-bold">
                        <article>
                            <ArticlesTable />
                        </article>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default News