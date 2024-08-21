'use client'
import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"; // Ajuste o import conforme necessário
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
}

export default function SettingsSidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectChange = (value: string) => {
    if (value) {
      router.push(value);
    }
  };

  return (
    <div>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold pb-6">Configurações</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="hidden md:grid gap-4 text-sm text-muted-foreground">
          <Link
            href="/dashboard/settings"
            className={`font-semibold ${pathname === '/dashboard/settings' ? 'text-primary' : ''}`}
          >Geral</Link>
          <Link
            href="/dashboard/settings/security"
            className={`font-semibold ${pathname === '/dashboard/settings/security' ? 'text-primary' : ''}`}
          >Segurança</Link>
        </nav>
        <div className="md:hidden">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Páginas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Página</SelectLabel>
                <SelectItem value="/dashboard/settings">Geral</SelectItem>
                <SelectItem value="/dashboard/settings/security">Segurança</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
