import { LastNews } from "@/components/dashboard/lastnews";
import { LastUsers } from "@/components/dashboard/lastusers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Exemplo de dados que poderiam ser buscados de um banco de dados.
const cardItems = [
  {
    title: "Notícias",
    description: "Quantidade de notícias do mês",
    fetchCount: 123, // Esse valor poderia ser substituído por uma busca no banco de dados
  },
  {
    title: "Usuários",
    description: "Quantidade total de usuários ativos",
    fetchCount: 45, // Esse valor poderia ser substituído por uma busca no banco de dados
  },
  {
    title: "Cidades",
    description: "Quantidade total de cidades ativas",
    fetchCount: 23, // Esse valor poderia ser substituído por uma busca no banco de dados
  },
  {
    title: "Total de notícias",
    description: "Quantidade total de notícias publicadas",
    fetchCount: 23, // Esse valor poderia ser substituído por uma busca no banco de dados
  }
];

export default function Dashboard() {
  return (
    <main className="sm:ml-14 p-2">
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {cardItems.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardDescription className="text-center">
              {item.description}
            </CardDescription>
            <CardContent className="text-center font-bold text-cyan-500">
              {item.fetchCount}
            </CardContent>
          </Card>
        ))}
      </section>
      <Separator className="my-3" />
      <section className="grid grid-cols-1 gap-2 lg:grid-cols-2 sm:grid-cols-1 row-span-3 h-600">
        <LastUsers />
        <LastNews />
      </section>
    </main>
  );
}
