import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function LastNews() {
  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Posts
          </CardTitle>
        </div>
        <Separator className="px-2" />
      </CardHeader>
      <CardContent className="text-center font-bold text-cyan-500">
        {/* TODO - Implementar lista de últimas notícias postadas no banco de dados */}
        <article>

        </article>
      </CardContent>
    </Card>
  )
}