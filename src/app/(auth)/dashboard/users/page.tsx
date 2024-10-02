
import UsersTable from "@/components/dashboard/usersTable";

const Users = () => {

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <UsersTable />
            </div>
        </div>
    )
}

export default Users