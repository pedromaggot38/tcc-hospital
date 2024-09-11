import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";
import AvatarDashboard from "../avatarDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UsersTable = async () => {
    const users = await db.user.findMany();

    return (
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
                        <TableCell>
                            {user.name}
                        </TableCell>
                        <TableCell>
                            {user.role}
                        </TableCell>
                        <TableCell>{user.email || 'Não informado'}</TableCell>
                        <TableCell>{user.phone || 'Não informado'}</TableCell>
                        <TableCell>{user.isBlocked ? "Sim" : "Não"}</TableCell>
                        <TableCell className="p-0">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="p-4"
                            >
                                <Link href={`/dashboard/users/${user.username}`}>Editar</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable;
