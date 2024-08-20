import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import Link from "next/link"

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        accessibility: "Página Inicial",
    },
    {
        title: "Usuários",
        path: "/dashboard/users",
        accessibility: "Usuários",
    },
    {
        title: "Notícias",
        path: "/dashboard/news",
        accessibility: "Notícias",
    },
];

export function DashboardHeader() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Logo</span>
                </Link>
                {menuItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.path}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <span className="">{item.title}</span>
                        <span className="sr-only">, {item.accessibility}</span>
                    </Link>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>

                        {menuItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.path}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <span className="">{item.title}</span>
                                <span className="sr-only">, {item.accessibility}</span>
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                key="settings"
                                href="/dashboard/settings"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <span className="">Configurações</span>
                                <span className="sr-only">Configurações</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                key="Ajuda"
                                href="/help"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <span className="">Ajuda</span>
                                <span className="sr-only">Ajuda</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}