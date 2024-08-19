import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeHelp, HouseIcon, LogOut, Menu, Newspaper, Settings2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        accessibility: "Página Inicial",
        icon: <HouseIcon />
    },
    {
        title: "Usuários",
        path: "/dashboard/users",
        accessibility: "Usuários",
        icon: <Users />
    },
    {
        title: "Notícias",
        path: "/dashboard/news",
        accessibility: "Notícias",
        icon: <Newspaper />
    },
    {
        title: "Configurações",
        path: "/dashboard/settings",
        accessibility: "Configurações",
        icon: <Settings2 />
    },
    {
        title: "Ajuda",
        path: "/dashboard/help",
        accessibility: "Ajuda",
        icon: <BadgeHelp />
    }
];

export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
                <nav className="flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider delayDuration={100}>
                        <Image src="/logo.png" alt="Logo" width={50} height={50} className="bg-background" />

                        {menuItems.map((item) => (
                            <Tooltip key={item.title}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.path}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-primary/20
                                        bg-background"
                                    >
                                        <span className="text-lg text-gray-700">{item.icon}</span>
                                        <span className="sr-only">{item.accessibility}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>

                <nav className="flex flex-col items-center gap-4 px-2 py-5 mt-auto text">

                    {
                        /*          TODO          */
                        /*   Botão de Dark mode   */
                    }

                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-primary/20
                                        bg-background"
                                >
                                    <span className="text-lg"><LogOut className="text-red-600" /></span>
                                    <span className="sr-only">Sair</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Sair
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-12 items-center px-2 border-b bg-background gap-3 sm:static sm:h-auto
                sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir / Fechar menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side={"left"} className="sm:max-w-x flex flex-col h-full">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Image src="/logo.png" alt="Logo" width={50} height={50} className="bg-background" />

                                {/* Itera sobre menuItems e cria links */}
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.path}
                                        className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/20"
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="font-medium">{item.title}</span>
                                        <span className="sr-only">, {item.accessibility}</span>
                                    </Link>
                                ))}
                            </nav>

                            <nav className="mt-auto">

                                {
                                    /*          TODO          */
                                    /*   Botão de Dark mode   */
                                }

                                <Link href="#" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/20">
                                    <span className="text-lg"><LogOut className="text-red-600" /></span>
                                    <span className="font-medium">Sair</span>
                                    <span className="sr-only">Sair</span>
                                </Link>
                            </nav>
                        </SheetContent>

                    </Sheet>

                    <h2>Menu</h2>
                </header>
            </div>
        </div>
    );
}
