'use client';

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { register } from "@/actions/auth/register";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useDialog } from "@/hooks/useDialog";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            password: '',
            role: 'journalist',
            isBlocked: false,
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log("Form is being submitted", values);
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        form.reset();
                        setTimeout(() => {
                            setDialogOpen(false);
                        }, 1000);
                    }

                    setTimeout(() => {
                        setSuccess('');
                        setError('');
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Error during registration", error);
                    setError("Houve um erro ao criar o usuário.");

                    setTimeout(() => setError(''), 2000);
                });
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openDialog();
    };

    return (
        <>
            <Button
                className="hover:bg-primary hover:text-white"
                variant="outline"
                onClick={() => setDialogOpen(true)}
            >
                Criar Usuário
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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

                            {/* Username Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <>
                                            <FormLabel className="col-span-1 text-right"><span className="text-red-500">*</span>Username</FormLabel>
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
                                            <FormLabel className="col-span-1 text-right"><span className="text-red-500">*</span>Senha</FormLabel>
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
                                <FormLabel className="col-span-1 text-right"><span className="text-red-500">*</span>Bloqueado</FormLabel>
                                <FormItem className="col-span-3">
                                    <FormControl>
                                        <Controller
                                            name="isBlocked"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ? 'true' : 'false'}
                                                    onValueChange={(value) => field.onChange(value === 'true')}
                                                >
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
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="col-span-1 text-right"><span className="text-red-500">*</span>Cargo</FormLabel>
                                <FormItem className="col-span-3">
                                    <FormControl>
                                        <Controller
                                            name="role"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ''}
                                                    onValueChange={(value) => field.onChange(value)}
                                                >
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
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
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
                                                        value={field.value || ''}
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
                                                        placeholder="you@example.com"
                                                        disabled={isPending}
                                                        {...field}
                                                        value={field.value ?? ''}
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
                                                        placeholder="(99)99999-9999"
                                                        disabled={isPending}
                                                        {...field}
                                                        value={field.value || ''}
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
                                            <FormLabel className="col-span-1 text-right">Imagem</FormLabel>
                                            <FormItem className="col-span-3">
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://github.com/username.png"
                                                        disabled={isPending}
                                                        {...field}
                                                        value={field.value || ''}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-4 items-center">
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger className="hover:bg-primary hover:text-white" asChild>
                                        <Button className="w-min" variant="outline">Criar</Button>
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
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};
