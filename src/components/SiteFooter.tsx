import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="hidden border-t border-border/80 bg-card text-foreground md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
        <div>
          <div className="font-extrabold">Hajazna</div>
          <p className="mt-1 text-muted-foreground">Sade villa ve yazlik kiralama uygulamasi.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 font-semibold text-muted-foreground">
          <Link to="/" className="transition hover:text-primary">
            Villa ara
          </Link>
          <Link to="/post-listing" className="transition hover:text-primary">
            Ilan ver
          </Link>
          <Link to="/contact" className="transition hover:text-primary">
            Destek
          </Link>
        </nav>
      </div>
    </footer>
  );
}
