import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ArticlesTable = async () => {
    const articles = await db.article.findMany({
        include: {
            user: true,
        },
    });

    return (
        <Table>
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
                            {article.title}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0" />
                        </TableCell>
                        <TableCell className="relative">
                            {article.content}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0" />
                        </TableCell>
                        <TableCell className="relative">
                            {article.user.name}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0" />
                        </TableCell>
                        <TableCell className="relative">
                            {article.published ? "Sim" : "Não"}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0" />
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
                                <Link href={`/dashboard/news/${article.slug}`}>Editar</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ArticlesTable;
