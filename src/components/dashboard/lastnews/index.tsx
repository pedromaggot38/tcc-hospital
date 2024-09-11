import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";  // Certifique-se de que o caminho esteja correto

export async function LastNews() {
  // Busca os últimos posts do banco de dados, limitando a quantidade (por exemplo, 5 últimos posts)
  const lastNews = await db.article.findMany({
    orderBy: { createdAt: 'desc' }, // Ordena por data de criação
    take: 5, // Limita a 5 posts
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
                  <TableCell>{news.title || 'Título não informado'}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{news.published ? "Sim" : "Não"}</TableCell>
                  <TableCell>{news.createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  );
}
