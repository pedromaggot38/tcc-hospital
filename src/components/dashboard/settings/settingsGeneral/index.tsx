'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/useDialog";
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas/auth/user"
import { register } from "@/../actions/user";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function SettingsGeneral() {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const { dialogOpen, openDialog, closeDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            password: '',
            role: 'journalist',
            isBlocked: "false",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log("Form is being submitted", values);
        setError('')
        setSuccess('')

        startTransition(() => {
            register(values)
                .then((data) => {
                    console.log("Response received", data);
                    setError(data.error)
                    setSuccess(data.success)
                })
                .catch((error) => {
                    console.error("Error during login", error);
                    setError("Houve um erro ao criar o usuário.");
                });
        })
    }


    return (
        <div className="flex flex-col gap-3">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Seu Nome</CardTitle>
                    <CardDescription>
                        Digite seu nome e sobrenome:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        {/*
                  TODO
                  CRUD
                */}
                        <Input placeholder="Nome e Sobrenome" />
                    </form>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Foto de Perfil</CardTitle>
                    <CardDescription>
                        Digite a URL do seu perfil Github como no exemplo:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            placeholder="https://github.com/username.png"
                        />
                    </form>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Seu E-mail</CardTitle>
                    <CardDescription>
                        Digite seu e-mail:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        {/*
                  TODO
                  CRUD
                */}
                        <Input placeholder="seuemail@email.com" />
                    </form>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Telefone</CardTitle>
                    <CardDescription>
                        Digite seu número de telefone:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        {/*
                  TODO
                  CRUD
                */}
                        <Input placeholder="11-999999999" />
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardFooter className="px-6 py-4 flex items-center justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger className="hover:bg-primary" asChild>
                            <Button variant="outline">Salvar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Alteração</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Você tem certeza que deseja alterar os dados?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    )
}