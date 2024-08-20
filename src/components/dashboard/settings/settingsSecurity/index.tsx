import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function settingsSecurity() {
    return (
        <div>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                        Digite sua senha atual:
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form>
                        {/*
                  TODO
                  CRUD
                */}
                        <Input placeholder="********" />
                    </form>
                </CardContent>

            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Nova Senha</CardTitle>
                    <CardDescription>
                        Digite e confirme a nova senha:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            placeholder="********"
                        />
                        <Input
                            placeholder="********"
                        />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}