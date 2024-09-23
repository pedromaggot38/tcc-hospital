import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface User {
    name: string | null;
    username: string;
    role: string;
    isBlocked: boolean;
    phone: string | null;
    email: string | null;
    image: string | null;
}

interface AccountTabProps {
    user: User;
    currentRole?: string;
}

const AccountTabContent: React.FC<AccountTabProps> = ({ user, currentRole }) => {
    const isRoot = currentRole === 'root';

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div>
                        Senha
                    </div>
                    <div className="text-sm">
                        Current Role: {currentRole}
                    </div>
                </CardTitle>
                <CardDescription>
                    Faça as mudanças do usuário <span className="text-blue-500">@{user.username}</span> aqui
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" defaultValue={user.name || ''} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user.username || ''} disabled={!isRoot} />
                </div>
                <div>
                    <span> ROLE: {currentRole}</span>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="role">Cargo</Label>
                    <Select defaultValue={user.role || 'journalist'}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="root">Root</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="journalist">Journalist</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="isBlocked">Bloqueado</Label>
                    <Select defaultValue={user.isBlocked ? 'true' : 'false'}>
                        <SelectTrigger>
                            <SelectValue placeholder="Blocked?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Sim</SelectItem>
                            <SelectItem value="false">Não</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue={user.phone || ''} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue={user.email || ''} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="image">Imagem URL</Label>
                    <Input id="image" defaultValue={user.image || ''} />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Salvar mudanças</Button>
            </CardFooter>
        </Card>
    );
};

export default AccountTabContent;
