import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { Articles, columns } from "./columns";


const ArticlesTable = async () => {
    const articles = await ({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
        },
    });
    return (<div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
    </div>);
};

export default ArticlesTable;
