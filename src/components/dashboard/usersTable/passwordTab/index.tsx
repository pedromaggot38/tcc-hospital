'use client'
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import TokenInput from "../../tokenInput";
import { generateVerificationToken } from "@/lib/tokenGenerate";
import { Separator } from "@/components/ui/separator";

interface User {
    username: string;
}

interface PasswordTabContentProps {
    user: User;
    currentRole?: string;
}

type FormData = z.infer<typeof PasswordResetSchema>;

const PasswordTabContent: React.FC<PasswordTabContentProps> = ({ user, currentRole }) => {
    const router = useRouter();
    const isRoot = currentRole === 'root';
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [token, setToken] = useState<string | null>(null); // Novo estado para armazenar o token
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

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`/api/token?username=${user.username}`);
                const data = await response.json();
                if (response.ok) {
                    setToken(data.token);
                } else {
                    setError(data.error || 'Erro ao buscar o token.');
                }
            } catch (err) {
                setError('Erro ao buscar o token.');
            }
        };

        if (user.username) {
            fetchToken();
        }
    }, [user.username]);

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
                        router.push('/dashboard/users');
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
                        <CardTitle>Token</CardTitle>
                        <CardDescription>
                            Código para a recuperação de senha do usuário <span className="text-blue-500">@{user.username}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user?.username && (
                            <>
                                <TokenInput username={user.username} />
                            </>
                        )}
                    </CardContent>
                    <Separator className="my-4" />
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Senha
                        </CardTitle>
                        <CardDescription>
                            Configure a nova senha para a conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">

                        </div>
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

                        <div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                    </CardContent>
                    {!isRoot && (
                        <CardFooter className="justify-center">
                            <span className="block text-red-600 bg-red-200 dark:text-white dark:bg-red-800 p-2 rounded-sm">
                                Você não possui permissão para alterar a senha manualmente.
                            </span>
                        </CardFooter>
                    )}
                    {isRoot && (
                        <CardFooter className="justify-end">

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
                        </CardFooter>
                    )}
                </Card>
            </form>
        </Form >
    );
};

export default PasswordTabContent;
