import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function LastNews() {
  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Posts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold text-cyan-500">
        {/* TODO - Implementar lista de últimas notícias postadas no banco de dados */}
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
              <TableRow>
                <TableCell>Lorem Ipsium</TableCell>
                <TableCell>Pedro Sanches</TableCell>
                <TableCell>Sim</TableCell>
                <TableCell>19/08/2024</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  )
}