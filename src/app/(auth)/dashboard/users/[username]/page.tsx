import { currentUser } from "@/lib/auth";
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

    const currentUserData = await currentUser();
    if (currentUserData?.role === 'journalist') {
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

    if (currentUserData?.username === user.username) {
        return redirect('/dashboard/users');
    }

    if (currentUserData?.role === 'admin' && user.role === 'root') {
        return redirect('/dashboard/users');
    }

    return (
        <div className="flex flex-col items-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Conta</TabsTrigger>
                    <TabsTrigger value="password">Senha</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <AccountTabContent user={user} currentRole={currentUserData?.role} />
                </TabsContent>

                <TabsContent value="password">
                    <PasswordTabContent user={user} currentRole={currentUserData?.role} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserPage;
