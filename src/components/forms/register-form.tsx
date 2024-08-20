'use client'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth/user"
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

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
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