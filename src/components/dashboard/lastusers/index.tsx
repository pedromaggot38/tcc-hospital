import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LastUsers() {
    return (
        <Card className="flex-1 min-h-[500px]">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
                Últimos Usuários
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="text-center font-bold text-cyan-500">
            {/* TODO - Implementar lista de últimas notícias postadas no banco de dados */}
            <article>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/pedromaggot38.png" />
                <AvatarFallback>PB</AvatarFallback>
              </Avatar>
            </article>
          </CardContent>
        </Card>
    );
}