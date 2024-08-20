import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function News() {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Notícias</h1>
                    <Button>Adicionar Post</Button>
                </div>

                <Card className="w-full">
                    <CardContent className="font-bold text-cyan-500">
                        {/* TODO - Implementar lista de últimos usuários no banco de dados */}
                        <article>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Conteúdo</TableHead>
                                        <TableHead>Criado Por</TableHead>
                                        <TableHead>Publicado</TableHead>
                                        <TableHead>Criado em</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Lorem Ipsium</TableCell>
                                        <TableCell>O conteúdo é listado a partir de</TableCell>
                                        <TableCell>Pedro Sanches</TableCell>
                                        <TableCell>Sim</TableCell>
                                        <TableCell>19/08/2024</TableCell>
                                        <TableCell className="p-0">
                                            <Button>Editar</Button>
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
