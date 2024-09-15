'use client'

import { ColumnDef } from "@tanstack/react-table"
import AvatarDashboard from "../avatarDashboard";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ActionMenu from "./actionMenu";
import { z } from "zod";
export const userSchema = z.object({
    id: z.string().cuid(),
    username: z.string(),
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
        header: "Nome",
        cell: ({ row }) => {
            const user = row.original

            return (
                <span className={user.name ? "" : "text-gray-500"}>
                    {user.name || "Não informado"}
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cargo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const user = row.original

            return (
                <Badge
                    className="flex items-center justify-center"
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Bloqueado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="text-center">
                    <span className={user.isBlocked ? "text-red-500" : ""} >
                        {row.original.isBlocked ? "Sim" : "Não"}
                    </span >
                </div>
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
