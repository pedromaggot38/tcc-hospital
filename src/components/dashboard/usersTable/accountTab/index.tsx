'use client'
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserEditSchema } from "@/schemas/auth/user";
import { useDialog } from "@/hooks/useDialog";
import { userEditUpdate } from "@/actions/auth/userEditUpdate";
import { Form } from "@/components/ui/form";

interface User {
    name: string | null;
    username: string;
    role: "root" | "admin" | "journalist";
    isBlocked: boolean;
    phone: string | null;
    email: string | null;
    image: string | null;
}
interface AccountTabProps {
    user: User;
    currentRole?: string;
}

type FormData = z.infer<typeof UserEditSchema>;

const AccountTabContent: React.FC<AccountTabProps> = ({ user, currentRole }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openDialog();
    };

    const form = useForm<FormData>({
        resolver: zodResolver(UserEditSchema),
        defaultValues: {
            name: user.name || '',
            role: user.role,
            isBlocked: user.isBlocked,
            phone: user.phone || '',
            email: user.email || '',
            image: user.image || '',
        },
    });

    const onSubmit = (values: z.infer<typeof UserEditSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            userEditUpdate(user.username, values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess(response.success);
                    }
                })
                .catch((error) => {
                    console.error("Error during update", error);
                    setError("Houve um erro ao atualizar os dados.");

                    setTimeout(() => setError(''), 2000);
                });
        });
    };

    return (
        <Form {...form}>
            <form
                className="grid gap-4 py-4"
                onSubmit={handleFormSubmit}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <div>
                                Conta
                            </div>
                            <div className="text-sm">
                                Current Role: {currentRole}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Faça as mudanças do usuário <span className="text-blue-500">@{user.username}</span> aqui
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" defaultValue={user.name || ''} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="role">Cargo</Label>
                            <Select defaultValue={user.role || 'journalist'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="root">Root</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="journalist">Journalist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="isBlocked">Bloqueado</Label>
                            <Select defaultValue={user.isBlocked ? 'true' : 'false'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Blocked?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Sim</SelectItem>
                                    <SelectItem value="false">Não</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" defaultValue={user.phone || ''} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" defaultValue={user.email || ''} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="image">Imagem URL</Label>
                            <Input id="image" defaultValue={user.image || ''} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <AlertDialog>
                            <AlertDialogTrigger className="hover:bg-primary hover:text-white" asChild>
                                <Button className="w-min" variant="outline">Atualizar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Atualização</AlertDialogTitle>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogHeader>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default AccountTabContent;


/*
'use client'
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { AccountEditSchema } from "@/schemas/auth/user";
import { useDialog } from "@/hooks/useDialog";
import { userEditUpdate } from "@/actions/auth/userEditUpdate";

interface User {
    name: string | null;
    username: string;
    role: "root" | "admin" | "journalist";
    isBlocked: boolean;
    phone: string | null;
    email: string | null;
    image: string | null;
}
interface AccountTabProps {
    user: User;
    currentRole?: string;
}

type FormData = z.infer<typeof AccountEditSchema>;

const AccountTabContent: React.FC<AccountTabProps> = ({ user, currentRole }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const form = useForm<FormData>({
        resolver: zodResolver(AccountEditSchema),
        defaultValues: {
            name: user.name || '',
            role: user.role,
            isBlocked: user.isBlocked,
            phone: user.phone || '',
            email: user.email || '',
            image: user.image || '',
        },
    });

    const onSubmit = (values: z.infer<typeof AccountEditSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            userEditUpdate(user.username, values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess(response.success);
                    }
                })
                .catch((error) => {
                    console.error("Error during update", error);
                    setError("Houve um erro ao atualizar os dados.");

                    setTimeout(() => setError(''), 2000);
                });
        });
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Conta</CardTitle>
                        <CardDescription>
                            Faça as mudanças do usuário <span className="text-blue-500">@{user.username}</span> aqui
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Label htmlFor="name">Nome</Label>
                                        <Input id="name" placeholder="Nome completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="role">Cargo</Label>
                                    <Select {...field} defaultValue={user.role || 'journalist'}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um cargo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="root">Root</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="journalist">Journalist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="isBlocked"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="isBlocked">Bloqueado</Label>
                                    <Select
                                        {...field}
                                        value={field.value ? 'true' : 'false'}  // Aqui você define o valor como string
                                        onValueChange={(value) => field.onChange(value === 'true')} // Converte de volta para booleano
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Bloqueado?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Sim</SelectItem>
                                            <SelectItem value="false">Não</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Label htmlFor="phone">Telefone</Label>
                                        <Input id="phone" placeholder="Telefone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" placeholder="E-mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Label htmlFor="image">Imagem URL</Label>
                                        <Input id="image" placeholder="https://github.com/username.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-4 items-center">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger className="hover:bg-primary hover:text-white" asChild>
                            <Button className="w-min" variant="outline">Atualizar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Atualização</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </form>
        </Form>
    );
};

export default AccountTabContent;


*/