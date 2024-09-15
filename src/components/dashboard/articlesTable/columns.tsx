'use client'

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ActionMenu from "./actionMenu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";

export const articleSchema = z.object({
    id: z.string().cuid(),
    title: z.string(),
    slug: z.string(),
    published: z.boolean().default(false),
    content: z.string().optional(),
    user: z.object({
        name: z.string().optional(),
        username: z.string(),
    }),
});

const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const contentPreview = (text: string | undefined, length: number = 20): string => {
    if (!text) return '';
    return text.length > length ? `${text.substring(0, length)}...` : text;
};

export type Articles = z.infer<typeof articleSchema>;

export const columns: ColumnDef<Articles>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "content",
        header: "Conteúdo",
        meta: { className: "w-1/2" },
        cell: info => {
            const value = info.getValue<string>();
            const displayContent = value ? contentPreview(value, 30) : 'Nada Informado';
            const textClass = value ? 'truncate' : 'text-gray-500';

            return <div className={textClass}>{displayContent}</div>;
        },
    },
    {
        accessorKey: "user.name",
        header: "Autor",
        cell: info => {
            const user = info.row.original.user

            if (user.name) {
                return user.name;
            } else if (user.username) {
                return (
                    <span className="text-blue-500">
                        @{user.username}
                    </span>
                );
            } else {
                return 'Autor não disponível';
            }
        },
    },
{
    accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Criado em
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
            cell: info => {
                const formattedDate = formatDate(info.getValue<Date>());
                return <div className="text-center">{formattedDate}</div>;
            }
},
{
    accessorKey: "published",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Publicado
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
            cell: info => {
                const isPublished = info.getValue<boolean>();
                return (
                    <div className="text-center">
                        {isPublished ? (
                            <div className="flex items-center justify-center text-green-500">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center text-red-500">
                                <XCircle className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                );
            },
    },
{
    id: "actions",
        cell: ({ row }) => {
            const article = row.original

            return (
                <ActionMenu article={article} />
            )
        },
    },
];
