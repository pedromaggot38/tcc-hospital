import { DashboardHeader } from "@/components/dashboard/dashboardHeader";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import { auth } from "@/../auth";
import { ThemeProvider } from "@/components/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={cn()}>
          <DashboardHeader />
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-4">
            <div>
              {children}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
