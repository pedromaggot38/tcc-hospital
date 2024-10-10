'use client'
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react"; // Importando ícones do Lucide

interface TokenInputProps {
    username: string;
}

const TokenInput: React.FC<TokenInputProps> = ({ username }) => {
    const [token, setToken] = useState<string | undefined>("");
    const [isTokenVisible, setIsTokenVisible] = useState(false);
    const [isLoadingToken, setIsLoadingToken] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (username) {
            fetch(`/api/token?username=${username}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.token) {
                        setToken(data.token);
                    } else if (data.error) {
                        console.error(data.error);
                    }
                    setIsLoadingToken(false);
                })
                .catch((err) => {
                    console.error("Erro ao buscar o token", err);
                    setToken("Erro ao buscar o token.");
                    setIsLoadingToken(false);
                });
        }
    }, [username]);

    const copyToClipboard = () => {
        if (token && token !== "Buscando token...") {
            navigator.clipboard.writeText(token);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Seu Token"
                    value={isLoadingToken ? "Buscando token..." : (isTokenVisible ? token : "••••••••••••••••••••••••••••••••••••")}
                    readOnly
                />
                <Button onClick={copyToClipboard} variant="outline" disabled={isLoadingToken || !token}>
                    <Copy className="w-5 h-5" />
                </Button>
                <Button onClick={() => setIsTokenVisible(!isTokenVisible)} variant="outline">
                    {isTokenVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
            </div>
            {copySuccess && <p className="text-green-500">Token copiado com sucesso!</p>}
        </div>
    );
};

export default TokenInput;