import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

export async function LastNews() {
  const lastNews = await db.article.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 7,
  });

  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Posts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold">
        <article>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Publicado</TableHead>
                <TableHead>Criado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastNews.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="relative">
                    {news.title || 'Título não informado'}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    {news.user.name ? (
                      news.user.name
                    ) : (
                      <span className="text-blue-500">{news.user.id}</span>
                    )}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    {news.published ? "Sim" : "Não"}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    {news.createdAt.toLocaleDateString()}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  );
}
