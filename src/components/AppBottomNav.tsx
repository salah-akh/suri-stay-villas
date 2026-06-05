import { Link } from "@tanstack/react-router";
import { Home, MessageCircle, Search, Settings } from "lucide-react";

export function AppBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/95 px-3 py-2 shadow-[0_-10px_30px_oklch(0.22_0.035_248_/_0.10)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{ className: "bg-primary/10 text-primary" }}
        >
          <Home className="h-4 w-4" />
          Ana sayfa
        </Link>
        <Link
          to="/listings"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{ className: "bg-primary/10 text-primary" }}
        >
          <Search className="h-4 w-4" />
          Villalar
        </Link>
        <Link
          to="/contact"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{ className: "bg-primary/10 text-primary" }}
        >
          <MessageCircle className="h-4 w-4" />
          Destek
        </Link>
        <Link
          to="/admin"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold text-muted-foreground"
          activeProps={{ className: "bg-primary/10 text-primary" }}
        >
          <Settings className="h-4 w-4" />
          Admin
        </Link>
      </div>
    </nav>
  );
}
