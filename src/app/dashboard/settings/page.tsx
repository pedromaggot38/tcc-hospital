import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold pb-6">Configurações</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
          <Link href="" className="font-semibold text-primary">
            Geral
          </Link>
          <Link href="/dashboard/settings">Segurança</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div className="grid gap-6">

        </div>
      </div>
    </main>
  )
}
