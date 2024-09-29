'use client'
import { useForm } from "react-hook-form";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useDialog } from "@/hooks/useDialog";
import { PasswordResetSchema } from "@/schemas/auth/user";
import { passwordReset } from "@/actions/auth/passReset";

interface User {
    username: string;
}

interface PasswordTabContentProps {
    user: User;
    currentRole?: string;
}

type FormData = z.infer<typeof PasswordResetSchema>;

const PasswordTabContent: React.FC<PasswordTabContentProps> = ({ user, currentRole }) => {
    const isRoot = currentRole === 'root';
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const { openDialog, handleConfirm, handleCancel } = useDialog(() => {
        form.handleSubmit(onSubmit)();
    });

    const form = useForm<FormData>({
        resolver: zodResolver(PasswordResetSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            if (!user?.username) {
                setError("Usuário não encontrado.");
                return;
            }
            passwordReset({ ...values, username: user.username })
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess(response.success);
                    }
                })
                .catch((error) => {
                    console.error("Error during password update", error);
                    setError("Houve um erro ao atualizar a senha.");
                    setTimeout(() => setError(''), 2000);
                });
        });
    };

    return (
        <Form {...form}>
            <form className="grid gap-4 py-4" onSubmit={(e) => { e.preventDefault(); openDialog(); }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <div>
                                Senha
                            </div>
                            <div className="text-sm">
                                Current Role: {currentRole}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Configure a nova senha para a conta <span className="text-blue-500">@{user.username}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={!isRoot || isPending}
                                                className={`${!isRoot ? 'border-red-500 bg-red-200' : ''}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 mb-2">
                            <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={!isRoot || isPending}
                                                className={`${!isRoot ? 'border-red-500 bg-red-200' : ''}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-6">
                            {!isRoot && (
                                <span className="block text-red-600 bg-red-200 p-2 rounded-sm">
                                    Você não possui permissão para alterar a senha manualmente.
                                </span>
                            )}
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                    </CardContent>
                    <CardFooter className={`flex ${isRoot ? 'justify-between' : 'justify-center'}`}>
                        <Button variant="outline">Copiar Token</Button>
                        {isRoot && (
                            <>
                                <Button variant="outline" className="hover:bg-red-500 hover:text-white">
                                    Gerar token
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger className="hover:bg-primary hover:text-white" asChild>
                                        <Button variant="default">Salvar</Button>
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
                            </>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default PasswordTabContent;
