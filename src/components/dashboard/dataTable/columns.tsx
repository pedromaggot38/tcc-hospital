'use client'

import { ColumnDef } from "@tanstack/react-table"
import AvatarDashboard from "../avatarDashboard";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import ActionMenu from "../actionMenu";
export const userSchema = z.object({
    id: z.string().cuid(),
    username: z.string().min(3),
    name: z.string().optional(),
    image: z.string().optional(),
    isBlocked: z.boolean().default(false),
    email: z.string().email().optional(),
    role: z.enum(["root", "admin", "journalist"]),
    phone: z.string().regex(/^\d{10,11}$/).optional(),
});

export type Users = z.infer<typeof userSchema>;

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div>
                    <AvatarDashboard user={user} />
                </div>
            );
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original

            return (
                <span className={user.name ? "" : "text-gray-500"}>
                    {row.original.name || "Não informado"}
                </span>
            );
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "E-mail",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <span className={`${user.email ? "" : "text-gray-500"} select-none`}>
                    {user.email || "Não informado"}
                </span>
            );
        }
    },
    {
        accessorKey: "phone",
        header: "Telefone",
        cell: ({ row }) => {
            const user = row.original

            return (
                <span className={user.phone ? "" : "text-gray-500"}>
                    {row.original.phone || "Não informado"}
                </span>
            );
        }
    },
    {
        accessorKey: "role",
        header: "Cargo",
        cell: ({ row }) => {
            const user = row.original

            return (
                <Badge
                    variant={
                        user?.role === "root"
                            ? "destructive"
                            : user?.role === "admin"
                                ? "default"
                                : "secondary"
                    }
                >
                    {user?.role}
                </Badge>
            );
        }
    },
    {
        accessorKey: "isBlocked",
        header: "Bloqueado",
        cell: ({ row }) => {
            const user = row.original

            return (
                < span className={user.isBlocked ? "text-red-500" : ""} >
                    {row.original.isBlocked ? "Sim" : "Não"}
                </span >
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <ActionMenu user={user} />
            )
        },
    },
];
