import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BadgeHelp, HouseIcon, Newspaper, PanelBottom, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        accessibility: "Página Incial",
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
        icon: <Settings />
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
            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-12 items-center px-2 border-b bg-background gap-4 sm:static sm:h-auto
                sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelBottom className="h-5 w-5" />
                                <span className="sr-only">Abrir / Fechar menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent className="sm:max-w-x">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href={"/"}
                                    className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center
                                    text-primary-foreground"
                                >
                                    <Image src="/logo.png" alt="Logo" width={50} height={50} className="bg-background" />
                                    <span className="sr-only">Logo</span>
                                </Link>

                                {/* Itera sobre menuItems e cria links */}
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.path}
                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/20"
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="font-medium">{item.title}</span>
                                        <span className="sr-only">, {item.accessibility}</span>
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    );
}
