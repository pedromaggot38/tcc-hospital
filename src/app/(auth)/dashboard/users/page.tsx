import UserTable from "@/components/dashboard/usersTable";
import { RegisterForm } from "@/components/forms/register-form";
import { Card, CardContent } from "@/components/ui/card";

const Users = () => {

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Usuários</h1>
                    <RegisterForm />
                </div>
                <Card className="w-full">
                    <CardContent className="font-bold text-cyan-500">
                        {/* TODO - Implementar lista de últimos usuários no banco de dados */}
                        <article>
                            <UserTable  />
                        </article>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Users