'use client'
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsEditSchema } from "@/schemas/auth/user";
import { userUpdate } from "@/actions/auth/userUpdate";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/useDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Separator } from "@/components/ui/separator";

export const UpdateForm = () => {

    const currentUser = useCurrentUser()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const form = useForm<z.infer<typeof SettingsEditSchema>>({
        resolver: zodResolver(SettingsEditSchema),
        defaultValues: {
            name: currentUser?.name ?? '',
            email: currentUser?.email ?? '',
            phone: currentUser?.phone ?? '',
            image: currentUser?.image ?? '',
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsEditSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            if (!currentUser?.id) {
                setError("Usuário não está logado");
                return;
            }

            userUpdate(currentUser.id, values)
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
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openDialog();
    };

    return ((
        <Form {...form}>
            <form
                className="grid gap-4 py-4"
                onSubmit={handleFormSubmit}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Seu Nome</CardTitle>
                        <CardDescription>Digite seu nome e sobrenome:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome e Sobrenome"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seu E-mail</CardTitle>
                        <CardDescription>Digite seu e-mail:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="E-mail"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Telefone</CardTitle>
                        <CardDescription>Digite seu número de telefone:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Telefone"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Separator
                    className="my-2"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Foto de Perfil</CardTitle>
                        <CardDescription>Digite a URL da sua imagem de perfil:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="https://github.com/username.png"
                                            disabled={isPending}
                                            {...field}
                                        />
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
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </form>
        </Form>
    ))
}
