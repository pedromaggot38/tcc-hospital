
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";  // Certifique-se de que o caminho esteja correto
import AvatarDashboard from "../avatarDashboard";

export async function LastUsers() {
  // Busca os últimos usuários do banco de dados, limitando a quantidade (por exemplo, 5 últimos usuários)
  const lastUsers = await db.user.findMany({
    orderBy: { createdAt: 'desc' }, // Ordena por data de criação
    take: 5, // Limita a 5 usuários
  });

  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Usuários
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold">
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
              {lastUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <AvatarDashboard user={user} />
                  </TableCell>
                  <TableCell>{user.name || 'Nome não informado'}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isBlocked ? "Sim" : "Não"}</TableCell>
                  <TableCell>{user.createdAt.toLocaleDateString()}</TableCell> {/* Ajuste a data conforme necessário */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  );
}
