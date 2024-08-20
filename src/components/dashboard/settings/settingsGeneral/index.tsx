import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function settingsGeneral() {
    return (
        <div>
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
                        <Input placeholder="seuemail@email.com" />
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardFooter className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Checkbox id="terms" className="mr-2" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Eu concordo com os <a href="/termos" className="text-blue-500 underline">termos de serviço</a> e a <a href="/politica-de-privacidade" className="text-blue-500 underline">política de privacidade</a>.
                        </label>
                    </div>
                    <Button>Salvar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}