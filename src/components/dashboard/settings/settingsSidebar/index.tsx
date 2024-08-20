'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
}

export default function SettingsSidebar({ children }: SidebarProps) {

  const pathname = usePathname();

  return (
    <main className="">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold pb-6">Configurações</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          <Link
            href="/dashboard/settings"
            className={`font-semibold ${pathname === '/dashboard/settings' ? 'text-primary' : ''}`}
          >Geral</Link>
          <Link
            href="/dashboard/settings/security"
            className={`font-semibold ${pathname === '/dashboard/settings/security' ? 'text-primary' : ''}`}

          >Segurança</Link>
          <Link href="#"></Link>
          <Link href="#"></Link>
          <Link href="#"></Link>
          <Link href="#"></Link>
        </nav>
        <div className="grid gap-6">
          {children}
        </div>
      </div>
    </main>
  );
}
