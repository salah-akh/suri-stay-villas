import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { MapPin, Plus, Search, X } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useListingsCatalog } from "@/lib/listing-store";

type SearchListingsPageProps = {
  initialQuery?: string;
  initialCity?: string;
  initialType?: string;
};

export function SearchListingsPage({
  initialQuery = "",
  initialCity = "all",
  initialType = "all",
}: SearchListingsPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity || "all");
  const [type, setType] = useState(initialType || "all");
  const { listings, cities, propertyTypes } = useListingsCatalog();

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings.filter(
      (listing) =>
        (!normalizedQuery ||
          listing.title.toLowerCase().includes(normalizedQuery) ||
          listing.description.toLowerCase().includes(normalizedQuery) ||
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
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Villa, sehir, bolge veya ozellik ara"
                className="h-14 rounded-lg border-primary/20 bg-background pl-12 pr-4 text-base shadow-[var(--shadow-card)]"
                autoComplete="off"
              />
            </div>

            <div id="tipler" className="mt-4 space-y-4">
              <OptionGroup title="Villa tipi">
                <FilterChip label="Tum tipler" active={type === "all"} onClick={() => setType("all")} />
                {propertyTypes.map((item) => (
                  <FilterChip
                    key={item}
                    label={item}
                    active={type === item}
                    onClick={() => setType(item)}
                  />
                ))}
              </OptionGroup>

              <OptionGroup title="Sehir">
                <FilterChip label="Tum sehirler" active={city === "all"} onClick={() => setCity("all")} />
                {cities.map((item) => (
                  <FilterChip
                    key={item}
                    label={item}
                    active={city === item}
                    onClick={() => setCity(item)}
                  />
                ))}
              </OptionGroup>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-background px-3 py-3 shadow-[var(--shadow-card)]">
              <div>
                <p className="text-sm font-extrabold text-foreground">{filtered.length} ilan bulundu</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ilana bas, fotograf ve detaylari gor.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters} className="h-10 bg-card">
                  <X className="h-4 w-4" /> Temizle
                </Button>
                <Button asChild className="h-10 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/post-listing">
                    <Plus className="h-4 w-4" /> Ilan ver
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-border/80 bg-card p-8 text-center shadow-[var(--shadow-card)]">
              <MapPin className="mx-auto h-8 w-8 text-primary" />
              <h2 className="mt-3 text-lg font-bold text-foreground">Ilan bulunamadi</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Arama kelimesini silin veya farkli bir tip/sehir secin.
              </p>
              <Button onClick={clearFilters} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                Tum ilanlari goster
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function OptionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-extrabold text-foreground">{title}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/80 bg-background text-foreground hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );
}
