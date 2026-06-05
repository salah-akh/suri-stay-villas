import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ChevronRight, Heart, MapPin, Search } from "lucide-react";
import type { Listing } from "@/data/listings";
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
      <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Heart className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Favoriler</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Begendiginiz ilanlari hizli erisim icin burada tutun.
          </p>

          {favoriteListings.length ? (
            <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
              {favoriteListings.map((listing) => (
                <FavoriteRow key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="text-sm font-bold text-foreground">Henuz favori ilanin yok.</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Ilan detayinda kalp butonuna basinca burada gorunur.
              </p>
              <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
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

function FavoriteRow({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="flex items-start gap-3 py-4"
    >
      <img
        src={listing.image_url}
        alt={listing.title}
        loading="lazy"
        className="h-16 w-20 shrink-0 rounded-md object-cover"
      />
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-sm font-extrabold leading-5 text-foreground">
          {listing.title}
        </span>
        <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {listing.city} / {listing.region}
        </span>
        <span className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-extrabold text-price">${listing.price_per_night} / gece</span>
          <span className="flex items-center gap-1">
            <Camera className="h-3.5 w-3.5" /> {listing.gallery.length}
          </span>
        </span>
      </span>
      <ChevronRight className="mt-5 h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
