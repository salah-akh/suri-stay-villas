import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, Plus, X } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AppBottomNav } from "@/components/AppBottomNav";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Ana" },
  { to: "/listings", label: "Ilanlar" },
  { to: "/contact", label: "Destek" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-card/95 text-foreground shadow-[var(--shadow-card)] backdrop-blur">
        <AdSlot slotId="top" variant="top" />
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
              <Home className="h-4 w-4" />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate text-lg font-extrabold">Hajazna</span>
              <span className="mt-1 block truncate text-[11px] font-medium text-muted-foreground">
                Villa kiralama
              </span>
            </span>
          </Link>

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
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/70 bg-card md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-2 py-3 text-sm font-semibold text-muted-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/post-listing" onClick={() => setOpen(false)}>
                  <Plus className="h-4 w-4" /> Ilan ver
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
      <AppBottomNav />
    </>
  );
}
