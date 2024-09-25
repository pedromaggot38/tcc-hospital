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
import AccountTabContent from "@/components/dashboard/usersTable/accountTab";
import PasswordTabContent from "@/components/dashboard/usersTable/passwordTab";

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
                    <AccountTabContent user={user} currentRole={currentRole} />
                </TabsContent>

                <TabsContent value="password">
                    <PasswordTabContent user={user} currentRole={currentRole} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserPage;
