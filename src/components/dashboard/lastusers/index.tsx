import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import AvatarDashboard from "../avatarDashboard";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export async function LastUsers() {
  const lastUsers = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <Card className="flex-1 min-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="sm:text-xl text-lg text-gray-800 select-none">
            Últimos Usuários
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold">
        <article>
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Bloqueado</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="relative">
                    <AvatarDashboard user={user} />
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link
                          href={`/dashboard/users/${user.username}`}
                          className={user.name ? "hover:underline" : "text-gray-500 hover:underline"}
                        >
                          {user.name || "Não informado"}
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <AvatarDashboard user={user} />
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-semibold">@{user.username}</h4>
                              <Badge
                                variant={
                                  user.role === "root"
                                    ? "destructive"
                                    : user.role === "admin"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {user.role}
                              </Badge>
                            </div>
                            <p className="text-sm">
                              The React Framework – created and maintained by @vercel.
                            </p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    {user.role}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    <span className={user.isBlocked ? "text-red-500" : ""}>
                      {user.isBlocked ? "Sim" : "Não"}
                    </span>
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                  <TableCell className="relative">
                    {user.createdAt.toLocaleDateString()}
                    <Separator orientation="vertical" className="absolute right-0 h-full top-0 my-2" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </article>
      </CardContent>
    </Card>
  );
}
