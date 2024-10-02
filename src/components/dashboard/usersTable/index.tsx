import { db } from "@/lib/db";
import { Users, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Users[]> {
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            role: true,
            email: true,
            image: true,
            phone: true,
            username: true,
            isBlocked: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return users.map((user) => ({
        id: user.id,
        role: user.role,
        username: user.username,
        isBlocked: user.isBlocked,
        name: user.name ?? undefined,
        email: user.email ?? undefined,
        image: user.image ?? undefined,
        phone: user.phone ?? undefined,
    }));
}

export default async function UsersTable() {
    const data = await getData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
