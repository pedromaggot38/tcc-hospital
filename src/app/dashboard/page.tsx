import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Exemplo de dados que poderiam ser buscados de um banco de dados.
const cardItems = [
  {
    title: "Notícias",
    description: "Quantidade total de notícias publicadas",
    fetchCount: 123, // Esse valor poderia ser substituído por uma busca no banco de dados
  },
  {
    title: "Usuários",
    description: "Quantidade total de usuários ativos",
    fetchCount: 45, // Esse valor poderia ser substituído por uma busca no banco de dados
  },
];

export default function Dashboard() {
  return (
    <main className="sm:ml-14 p-2">
      <section className="grid grid-cols-2 gap-2">
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
            <CardContent className="text-center">
              {item.fetchCount}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
