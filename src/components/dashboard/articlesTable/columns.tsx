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

export type Articles = z.infer<typeof articleSchema>;

export const columns: ColumnDef<Articles>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "content",
        header: "Conteúdo",
    },
    {
        accessorKey: "published",
        header: "Publicado"
    },
];
