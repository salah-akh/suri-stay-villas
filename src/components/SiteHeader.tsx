import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Home, Plus } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AppBottomNav } from "@/components/AppBottomNav";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Villa ara" },
  { to: "/contact", label: "Destek" },
] as const;

export function SiteHeader() {
  const pageTitle = useRouterState({
    select: (state) => getPageTitle(state.location.pathname),
  });

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-card/95 text-foreground shadow-[var(--shadow-card)] backdrop-blur">
        <AdSlot slotId="top" variant="top" />
        <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-link text-primary-foreground shadow-[var(--shadow-card)]">
              <Home className="h-4 w-4" />
            </span>
            <span className="hidden min-w-0 leading-none md:block">
              <span className="block truncate text-lg font-extrabold">Hajazna</span>
              <span className="mt-1 block truncate text-[11px] font-medium text-muted-foreground">
                Villa kiralama
              </span>
            </span>
          </Link>

          <div className="pointer-events-none absolute left-1/2 max-w-[48vw] -translate-x-1/2 truncate text-sm font-extrabold text-foreground md:hidden">
            {pageTitle}
          </div>

          <nav className="ml-3 hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                activeProps={{
                  className:
                    "rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary",
                }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button asChild size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/post-listing">
                <Plus className="h-4 w-4" /> Ilan ver
              </Link>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Bildirimler"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground md:hidden"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </header>
      <AppBottomNav />
    </>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === "/") return "Anasayfa";
  if (pathname.startsWith("/messages")) return "Mesajlar";
  if (pathname.startsWith("/post-listing")) return "Ilan ver";
  if (pathname.startsWith("/favorites")) return "Favoriler";
  if (pathname.startsWith("/account")) return "Hesabim";
  if (pathname.startsWith("/listings/")) return "Ilan detayi";
  if (pathname.startsWith("/listings")) return "Ilanlar";
  if (pathname.startsWith("/contact")) return "Destek";
  if (pathname.startsWith("/admin")) return "Admin";
  if (pathname.startsWith("/about")) return "Hakkimizda";

  return "Hajazna";
}
