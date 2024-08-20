import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Users() {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Usuários</h1>
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
                </div>

                <Card className="w-full">
                    <CardContent className="font-bold text-cyan-500">
                        {/* TODO - Implementar lista de últimos usuários no banco de dados */}
                        <article>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Avatar</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Cargo</TableHead>
                                        <TableHead>E-mail</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead>Bloqueado</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="https://github.com/pedromaggot38.png" />
                                                <AvatarFallback>PB</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>Pedro Sanches</TableCell>
                                        <TableCell>Root</TableCell>
                                        <TableCell>pedro.sanches@empresa.com</TableCell>
                                        <TableCell>11 99999-9999</TableCell>
                                        <TableCell>Não</TableCell>
                                        <TableCell className="p-0">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Edit Profile</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Editar Perfil</DialogTitle>
                                                        <DialogDescription>
                                                            Faça as alterações do perfil aqui
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                Nome
                                                            </Label>
                                                            <Input id="name" name="name" className="col-span-3" />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Username
                                                            </Label>
                                                            <Input id="username" name="username" className="col-span-3" />
                                                        </div>
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
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="blocked" className="text-right">
                                                                Bloqueado
                                                            </Label>
                                                            <Select name="blocked">
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
                                                            <Select name="role">
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
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Salvar</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </article>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
