import { db } from "@/lib/db";
import { NextPage } from 'next';
import { notFound } from 'next/navigation';

interface Params {
    username: string;
}

const UserPage: NextPage<{ params: Params }> = async ({ params }) => {
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
            <h1>{user.name}</h1>
            <p>Email: {user.id}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserPage;
