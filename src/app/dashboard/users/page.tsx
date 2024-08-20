import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { RegisterForm } from "@/components/forms/register-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Users = () => {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Usuários</h1>
                    <RegisterForm />
                </div>
                <Card className="w-full">
                    <CardContent className="font-bold text-cyan-500">
                        {/* TODO - Implementar lista de últimos usuários no banco de dados */}
                        <article>
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
                                    <TableRow>
                                        <TableCell>
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="https://github.com/pedromaggot38.png" />
                                                <AvatarFallback>PB</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>Pedro Sanches</TableCell>
                                        <TableCell>Root</TableCell>
                                        <TableCell>pedro.sanches@empresa.com</TableCell>
                                        <TableCell>11 99999-9999</TableCell>
                                        <TableCell>Não</TableCell>
                                        <TableCell className="p-0">
                                            <EditProfileForm />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </article>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default Users