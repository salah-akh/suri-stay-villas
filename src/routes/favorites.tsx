import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favoriler - Hajazna" },
      {
        name: "description",
        content: "Favori villa ve yazlik ilanlarinizi takip edin.",
      },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-lg border border-border/80 bg-card p-6 text-center shadow-[var(--shadow-card)]">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Heart className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Favoriler</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Begendiginiz ilanlari burada takip edebilirsiniz. Simdilik ilanlari kesfetmeye
            baslayin.
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
