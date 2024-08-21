'use client'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/user"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"

import { Separator } from "../ui/separator";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { register } from "@/../actions/user";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useDialog } from "@/hooks/useDialog";

export const RegisterForm = () => {

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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openDialog();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Criar Usuário</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                        onSubmit={handleFormSubmit}
                    >
                        <DialogHeader>
                            <DialogTitle>Criar Novo Usuário</DialogTitle>
                            <DialogDescription>
                                Digite as informações do novo usuário
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Username</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Username"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Senha</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Senha"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="isBlocked"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Bloqueado</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Select {...field}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecione" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="false">Não</SelectItem>
                                                                <SelectItem value="true">Sim</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Cargo</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Select {...field}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecione" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Cargos</SelectLabel>
                                                                <SelectItem value="root">Root</SelectItem>
                                                                <SelectItem value="admin">Administrador</SelectItem>
                                                                <SelectItem value="journalist">Jornalista</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Nome</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nome e Sobrenome"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">E-mail</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="E-mail"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Telefone</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Telefone"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right">Avatar</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Avatar"
                                                        disabled={isPending}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>


                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <AlertDialog open={dialogOpen} onOpenChange={closeDialog}>
                            <AlertDialogTrigger>
                                <Button variant="outline">Criar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Criação</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você tem certeza que deseja criar este usuário?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleConfirm}>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

/*
    RegisterForm Limpo
'use client'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/user"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"

import { login } from "../../../actions/login";
import { Separator } from "../ui/separator";

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            password: '',
            role: 'journalist',
            isBlocked: false,
            name: '',
            phone:'',
            email: ''
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Criar Usuário</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Criar Novo Usuário</DialogTitle>
                    <DialogDescription>
                        Digite as informações do novo usuário
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" name="username" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Senha
                        </Label>
                        <Input id="password" name="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blocked" className="text-right">
                            Bloqueado
                        </Label>
                        <Select required name="blocked">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="false">Não</SelectItem>
                                    <SelectItem value="true">Sim</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Cargo
                        </Label>
                        <Select required name="role">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cargos</SelectLabel>
                                    <SelectItem value="root">Root</SelectItem>
                                    <SelectItem value="admin">Administrador</SelectItem>
                                    <SelectItem value="journalist">Jornalista</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            E-mail
                        </Label>
                        <Input id="email" name="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Telefone
                        </Label>
                        <Input id="phone" name="phone" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Avatar
                        </Label>
                        <Input id="image" name="image" className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


*/