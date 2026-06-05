import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Hakkimizda - Hajazna" },
      {
        name: "description",
        content: "Hajazna, villa ve yazlik ilanlarini sade bir uygulama deneyimiyle sunar.",
      },
      { property: "og:title", content: "Hakkimizda - Hajazna" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <section className="w-full max-w-2xl rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Home className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-foreground">Hajazna nedir?</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Hajazna, villa ve yazlik ilanlarini kolayca aramak, incelemek ve ev sahibiyle hizli
            iletisime gecmek icin hazirlanan sade bir kiralama uygulamasidir.
          </p>
          <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/listings">
              <Search className="h-4 w-4" /> Ilanlara bak
            </Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
