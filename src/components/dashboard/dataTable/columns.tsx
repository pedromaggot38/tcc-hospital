'use client'
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod";
import AvatarDashboard from "../avatarDashboard";

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

// Tipo inferido a partir do schema do Zod
export type Users = z.infer<typeof userSchema>;

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => {
            return (
                <div>
                    <AvatarDashboard user={row.original.image} />
                </div>
            );
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <span className={row.original.name ? "" : "text-gray-500"}>
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
            return (
                <span className={row.original.email ? "" : "text-gray-500"}>
                    {row.original.email || "Não informado"}
                </span>
            );
        }
    },
    {
        accessorKey: "phone",
        header: "Telefone",
        cell: ({ row }) => {
            return (
                <span className={row.original.phone ? "" : "text-gray-500"}>
                    {row.original.phone || "Não informado"}
                </span>
            );
        }
    },
    {
        accessorKey: "role",
        header: "Cargo",
    },
    {
        accessorKey: "isBlocked",
        header: "Bloqueado",
        cell: ({ row }) => {
            return (
                < span className={row.original.isBlocked ? "text-red-500" : ""} >
                    {row.original.isBlocked ? "Sim" : "Não"}
                </span >
            );
        }

    },
];