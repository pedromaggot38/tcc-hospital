'use client';

import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { passwordUpdate } from "@/actions/auth/passUpdate";
import { PasswordUpdateSchema } from "@/schemas/auth/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Separator } from "@/components/ui/separator";
import { useDialog } from "@/hooks/useDialog";
import TokenInput from "../dashboard/tokenInput";

export const PasswordUpdateForm = () => {
    const currentUser = useCurrentUser();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        handleSubmit(onSubmit)();
    });

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<z.infer<typeof PasswordUpdateSchema>>({
        resolver: zodResolver(PasswordUpdateSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = (values: z.infer<typeof PasswordUpdateSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            if (!currentUser?.id) {
                setError("Usuário não está logado");
                return;
            }

            passwordUpdate(currentUser.id, values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess(response.success);
                        setDialogOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error during password update", error);
                    setError("Houve um erro ao atualizar a senha.");
                });
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openDialog();
    };
    
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Token</CardTitle>
                    <CardDescription>
                        Copie aqui seu Token para a recuperação de senha e guarde-o em um local seguro.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentUser?.username && (
                        <TokenInput username={currentUser.username} />
                    )}
                </CardContent>
            </Card>

            <Separator className="my-2" />
            <Card>
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                        Digite sua senha atual e a nova senha para realizar a alteração:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                        <Input
                            placeholder="Senha atual"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <Input
                            placeholder="Nova Senha"
                            type="password"
                            {...register("newPassword")}
                        />
                        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}

                        <Input
                            placeholder="Confirmar Nova Senha"
                            type="password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </form>
                </CardContent>

                <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
                    <div className="flex gap-4">
                        {error && <FormError message={error} />}
                        {success && <FormSuccess message={success} />}
                    </div>
                    <div>
                        <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                            <AlertDialogTrigger className="hover:bg-primary hover:text-white" asChild>
                                <Button className="w-min" variant="outline">Salvar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Alteração</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você tem certeza que deseja alterar sua senha?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
