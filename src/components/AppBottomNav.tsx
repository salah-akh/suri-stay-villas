import { Link } from "@tanstack/react-router";
import { Home, MessageCircle, Plus, Search } from "lucide-react";

export function AppBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/95 px-3 py-2 shadow-lg backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{
            className:
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary/10 text-[11px] font-bold text-primary",
          }}
        >
          <Home className="h-4 w-4" />
          Ana sayfa
        </Link>
        <Link
          to="/listings"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{
            className:
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary/10 text-[11px] font-bold text-primary",
          }}
        >
          <Search className="h-4 w-4" />
          Villalar
        </Link>
        <Link
          to="/contact"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{
            className:
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary/10 text-[11px] font-bold text-primary",
          }}
        >
          <MessageCircle className="h-4 w-4" />
          Destek
        </Link>
        <Link
          to="/post-listing"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{
            className:
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary/10 text-[11px] font-bold text-primary",
          }}
        >
          <Plus className="h-4 w-4" />
          Ilan ver
        </Link>
      </div>
    </nav>
  );
}
