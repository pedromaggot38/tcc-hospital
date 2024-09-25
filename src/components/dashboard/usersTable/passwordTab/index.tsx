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
import { Label } from "@/components/ui/label";

interface User {
    username: string;
}

interface PasswordTabContentProps {
    user: User;
    currentRole?: string;
}

const PasswordTabContent: React.FC<PasswordTabContentProps> = ({ user, currentRole }) => {
    const isRoot = currentRole === 'root';

    return (
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
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        disabled={!isRoot}
                        className={!isRoot ? "border-red-500 bg-red-50" : ""}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="confirmnewPassword">Confirmar nova senha</Label>
                    <Input
                        id="confirmnewPassword"
                        type="password"
                        disabled={!isRoot}
                        className={!isRoot ? "border-red-500 bg-red-50" : ""}
                    />
                </div>
                {!isRoot && (
                    <span className="block mt-2 text-red-600 bg-red-200 p-2 rounded-sm">
                        Você não possui permissão para alterar a senha manualmente.
                    </span>
                )}
            </CardContent>
            <CardFooter className={`flex ${isRoot ? 'justify-between' : 'justify-center'}`}>
                <Button variant="outline">Copiar Token</Button>
                {isRoot && (
                    <>
                        <Button
                            variant="outline"
                            className="hover:bg-red-500 hover:text-white"
                        >
                            Gerar token
                        </Button>
                        <Button
                            variant="default"
                            className="hover:bg-blue-400 hover:text-black"
                        >
                            Salvar
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

export default PasswordTabContent;
