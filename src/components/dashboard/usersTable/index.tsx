import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { db } from "@/lib/db";
import AvatarDashboard from "../avatarDashboard";
import { Badge } from "@/components/ui/badge";

const UsersTable = async () => {
    // Busca os usuários do banco de dados
    const users = await db.user.findMany();

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Bloqueado</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <AvatarDashboard user={user} /> {/* Substitui o avatar comum */}
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        user.role === "root"
                                            ? "destructive"
                                            : user.role === "admin"
                                                ? "default"
                                                : "secondary"
                                    }
                                >
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.email || 'Não informado'}</TableCell>
                            <TableCell>{user.phone || 'Não informado'}</TableCell>
                            <TableCell>{user.isBlocked ? "Sim" : "Não"}</TableCell>
                            <TableCell className="p-0">
                                {/* Adicione outras ações aqui, como um botão para editar */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
