import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { MapPin, Plus, Search, X } from "lucide-react";
import { PropertyRow } from "@/components/PropertyCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListingsCatalog } from "@/lib/listing-store";

const searchSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute("/listings")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Kiralik Villalar - Hajazna" },
      {
        name: "description",
        content: "Suriye genelinde villa ve yazlik ilanlarini sade filtrelerle inceleyin.",
      },
      { property: "og:title", content: "Kiralik Villalar - Hajazna" },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const isDetailPage = useRouterState({
    select: (state) => state.location.pathname.startsWith("/listings/"),
  });

  return isDetailPage ? <Outlet /> : <ListingsIndexPage />;
}

function ListingsIndexPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState<string>(search.q ?? "");
  const [city, setCity] = useState<string>(search.city ?? "all");
  const [type, setType] = useState<string>(search.type ?? "all");
  const { listings, cities, propertyTypes } = useListingsCatalog();

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings.filter(
      (listing) =>
        (!normalizedQuery ||
          listing.title.toLowerCase().includes(normalizedQuery) ||
          listing.city.toLowerCase().includes(normalizedQuery) ||
          listing.region.toLowerCase().includes(normalizedQuery) ||
          listing.property_type.toLowerCase().includes(normalizedQuery)) &&
        (city === "all" || listing.city === city) &&
        (type === "all" || listing.property_type === type),
    );
  }, [listings, query, city, type]);

  const clearFilters = () => {
    setQuery("");
    setCity("all");
    setType("all");
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <MapPin className="h-4 w-4" /> Ilan ara
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                  Kiralik villa ilanlari
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Aradigin villayi isim, sehir veya tipe gore bul.
                </p>
              </div>
              <Button asChild className="h-11 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/post-listing">
                  <Plus className="h-4 w-4" /> Ilan ver
                </Link>
              </Button>
            </div>

            <div className="mt-5 grid gap-3 rounded-lg border border-border/80 bg-background p-3 shadow-[var(--shadow-card)] lg:grid-cols-[1fr_180px_180px_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Villa, sehir veya bolge ara"
                  className="h-11 rounded-md bg-card pl-9"
                />
              </div>

              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-11 rounded-md bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tum sehirler</SelectItem>
                  {cities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-11 rounded-md bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tum tipler</SelectItem>
                  {propertyTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters} className="h-11 bg-card">
                <X className="h-4 w-4" /> Temizle
              </Button>
            </div>

            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
              {[
                "1. Sehir veya tip sec",
                "2. Begendigin ilana bas",
                "3. WhatsApp ile sor",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-md border border-border/80 bg-background px-3 py-2 font-semibold text-muted-foreground"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{filtered.length}</span> ilan gosteriliyor
            </p>
            <p className="hidden text-sm font-semibold text-primary sm:block">
              Detay icin ilana dokun
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-border/80 bg-card p-8 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-bold text-foreground">Ilan bulunamadi</h2>
              <p className="mt-2 text-sm text-muted-foreground">Arama kelimesini veya filtreleri degistirin.</p>
              <Button onClick={clearFilters} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                Temizle
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((listing) => (
                <PropertyRow key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
