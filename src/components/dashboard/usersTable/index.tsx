import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import AvatarDashboard from "../avatarDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/../auth";
const UsersTable = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <Table className="overflow-hidden">
            <TableHeader>
                <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Username</TableHead>
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
                        <TableCell className="relative">
                            <AvatarDashboard user={user} />
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.name}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.username}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.role}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.email || 'Não informado'}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.phone || 'Não informado'}
                            <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                        </TableCell>
                        <TableCell className="relative">
                            {user.isBlocked ? "Sim" : "Não"}
                        </TableCell>
                        <TableCell className="p-0">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-500 hover:text-white p-4"
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
