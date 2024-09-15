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
        cell: info => (
            <div className="truncate">{contentPreview(info.getValue<string>(), 30)}</div>
        ),
    },
    {
        accessorKey: "user.name",
        header: "Autor",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Criado em
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: info => formatDate(info.getValue<Date>()),
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
