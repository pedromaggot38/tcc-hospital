
import UsersTable from "@/components/dashboard/usersTable";
import { RegisterForm } from "@/components/forms/register-form";

const Users = () => {

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Usuários</h1>
                    <RegisterForm />
                </div>
                <UsersTable />
            </div>
        </div>
    )
}

export default Users