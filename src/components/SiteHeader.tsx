import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, User, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Villas" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
      {/* Top utility bar */}
      <div className="hidden border-b border-border bg-muted/60 md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-end gap-5 px-4 text-xs text-muted-foreground sm:px-6">
          <a href="#" className="hover:text-link">Help</a>
          <a href="#" className="hover:text-link">EN / AR</a>
          <a href="#" className="hover:text-link">List your villa</a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <span className="bg-primary px-2.5 py-1 text-lg font-extrabold tracking-tight text-primary-foreground">
            حجزنا<span className="text-price">.com</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-sm px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted"
              activeProps={{ className: "rounded-sm px-3 py-1.5 text-sm font-semibold text-link bg-muted" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <Heart className="h-4 w-4" /> Favorites
          </button>
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <User className="h-4 w-4" /> Sign In
          </button>
          <Button asChild size="sm" className="h-8 gap-1.5 rounded-sm bg-price text-white hover:bg-price/90">
            <Link to="/contact"><Plus className="h-4 w-4" /> Post Listing</Link>
          </Button>
        </div>

        <button className="ml-auto md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border-b border-border/60 py-3 text-sm font-semibold text-foreground last:border-0"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}