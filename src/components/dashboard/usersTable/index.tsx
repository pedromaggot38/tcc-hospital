import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileForm } from "@/components/forms/edit-profile-form";
const UsersTable = () => {
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
        </div>
    )
}

export default UsersTable