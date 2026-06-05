import { Link } from "@tanstack/react-router";
import { Heart, Home, MessageCircle, Plus, Search } from "lucide-react";

const navItemClass =
  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground";
const activeNavItemClass =
  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary/10 text-[11px] font-bold text-primary";

export function AppBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={navItemClass}
          activeProps={{ className: activeNavItemClass }}
        >
          <Home className="h-4 w-4" />
          Ana
        </Link>
        <Link
          to="/listings"
          className={navItemClass}
          activeProps={{ className: activeNavItemClass }}
        >
          <Search className="h-4 w-4" />
          Ilanlar
        </Link>
        <Link
          to="/post-listing"
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md bg-primary text-[11px] font-extrabold text-primary-foreground shadow-[var(--shadow-card)]"
          activeProps={{
            className:
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-md bg-primary text-[11px] font-extrabold text-primary-foreground shadow-[var(--shadow-card)]",
          }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
            <Plus className="h-4 w-4" />
          </span>
          Ilan ver
        </Link>
        <Link
          to="/favorites"
          className={navItemClass}
          activeProps={{ className: activeNavItemClass }}
        >
          <Heart className="h-4 w-4" />
          Favori
        </Link>
        <Link
          to="/contact"
          className={navItemClass}
          activeProps={{ className: activeNavItemClass }}
        >
          <MessageCircle className="h-4 w-4" />
          Destek
        </Link>
      </div>
    </nav>
  );
}
