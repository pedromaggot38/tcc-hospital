import { currentUserRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextPage } from 'next';
import { notFound, redirect } from 'next/navigation';
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Assumindo que você tem um Select na biblioteca UI

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

                {/* Aba de informações da conta */}
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conta</CardTitle>
                            <CardDescription>
                                Faça as mudanças do usuário aqui
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={user.name || ''} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue={user.username || ''} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="role">Role</Label>
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
                                <Label htmlFor="isBlocked">Is Blocked</Label>
                                <Select defaultValue={user.isBlocked ? 'yes' : 'no'}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Blocked?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" defaultValue={user.phone || ''} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={user.email || ''} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" defaultValue={user.image || ''} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Salvar mudanças</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Senha</CardTitle>
                            <CardDescription>
                                Configurações de senha
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Salvar senha</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserPage;
