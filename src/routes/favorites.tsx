import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { PropertyRow } from "@/components/PropertyCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useFavoriteIds } from "@/lib/favorites-store";
import { useListingsCatalog } from "@/lib/listing-store";

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
  const { favoriteIds } = useFavoriteIds();
  const { listings } = useListingsCatalog();
  const favoriteListings = listings.filter((listing) => favoriteIds.includes(listing.id));

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Heart className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-foreground">Favoriler</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Begendiginiz ilanlari burada takip edebilirsiniz.
            </p>
          </div>

          {favoriteListings.length ? (
            <div className="mt-5 grid gap-3">
              {favoriteListings.map((listing) => (
                <PropertyRow key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-5 max-w-md rounded-lg border border-border/80 bg-card p-6 text-center shadow-[var(--shadow-card)]">
              <p className="text-sm leading-6 text-muted-foreground">
                Henuz favorilere eklenen ilan yok. Ilan detayindan kalp butonuna basarak ekleyebilirsiniz.
              </p>
              <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/listings">
                  <Search className="h-4 w-4" /> Ilanlara bak
                </Link>
              </Button>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
