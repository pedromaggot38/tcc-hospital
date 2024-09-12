import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ArticlesTable = async () => {
    const articles = await db.article.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
        },
    });

    const getPreview = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
    };

    return (
        <Table className="overflow-hidden">
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead>Criado Por</TableHead>
                    <TableHead>Publicado</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell className="relative">
                            <Link href={`/dashboard/articles/${article.slug}`} className="text-sm hover:underline">
                                {article.title}
                            </Link>
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {getPreview(article.content || "", 40)}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            <Link
                                href={`/dashboard/users/${article.user.username}`}
                                className={article.user.name ? "hover:underline" : "text-blue-500 hover:underline"}
                            >
                                {getPreview(article.user.name ? article.user.name : article.user.id, 15)}
                            </Link>
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {article.published ? "Sim" : "Não"}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {article.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="p-0">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-500 hover:text-white p-4"
                            >
                                <Link href={`/dashboard/articles/${article.slug}`}>Editar</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ArticlesTable;
