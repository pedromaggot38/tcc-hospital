import { currentUserRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextPage } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
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
import AccountTabContent from "@/components/dashboard/usersTable/accountTab";
import PasswordTabContent from "@/components/dashboard/usersTable/passwordTab";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Params {
    username: string;
}

const UserPage: NextPage<{ params: Params }> = async ({ params }) => {
    // Verificação se o usuário é Journalist, pois não pode ter acesso
    const currentRole = await currentUserRole();
    if (currentRole === 'journalist') {
        return redirect('/dashboard/users');
    }

    const user = await db.user.findUnique({
        where: {
            username: params.username,
        },
    });

    if (!user) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Conta</TabsTrigger>
                    <TabsTrigger value="password">Senha</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
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
                                <Input id="username" defaultValue={user.username || ''} disabled={currentRole !== 'root'} />
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
                </TabsContent>

                <TabsContent value="password">
                    <PasswordTabContent user={user} currentRole={currentRole} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserPage;
