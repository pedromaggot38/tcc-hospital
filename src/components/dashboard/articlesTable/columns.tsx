'use client'

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ActionMenu from "../actionMenu";

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
        header: "Criado em",
        cell: info => formatDate(info.getValue<Date>()),
    },
    {
        accessorKey: "published",
        header: "Publicado",
        cell: info => {
            const isPublished = info.getValue<boolean>();
            return (
                <span className={isPublished ? "" : "text-red-500"}>
                    {isPublished ? "Sim" : "Não"}
                </span>
            );
        },
    },
];
