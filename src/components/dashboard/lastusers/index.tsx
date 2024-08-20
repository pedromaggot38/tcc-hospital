import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function LastUsers() {
  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Usuários
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold text-cyan-500">
        {/* TODO - Implementar lista de últimos usuários no banco de dados */}
        <article>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Bloqueado</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/pedromaggot38.png" />
                    <AvatarFallback>PB</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>Pedro Sanches</TableCell>
                <TableCell>Root</TableCell>
                <TableCell>Não</TableCell>
                <TableCell>24/07/2024</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  );
}