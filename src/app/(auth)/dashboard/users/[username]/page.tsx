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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

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
            <Tabs defaultValue="account" className="w-[500px]">
                <div className="flex gap-4 mb-2 justify-start">
                    <Link href="/dashboard/users">
                        <Button variant="outline" size="icon" className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Voltar</span>
                        </Button>
                    </Link>
                    <h1 className="whitespace-nowrap text-xl font-semibold tracking-tight">
                        Editar Usuário
                    </h1>
                </div>
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