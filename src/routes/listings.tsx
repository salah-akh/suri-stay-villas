import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowUpDown, ChevronRight, MapPin, Shield, SlidersHorizontal, Sun, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyRow } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cities, listings, propertyTypes } from "@/data/listings";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute("/listings")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Villas - Hajazna" },
      {
        name: "description",
        content: "Browse premium villas and vacation rentals across Syria. Filter by city, price, and amenities.",
      },
      { property: "og:title", content: "All Villas - Hajazna" },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const search = Route.useSearch();
  const [city, setCity] = useState<string>(search.city ?? "all");
  const [type, setType] = useState<string>(search.type ?? "all");
  const [price, setPrice] = useState<number[]>([300]);
  const [solar, setSolar] = useState(false);
  const [privateOnly, setPrivateOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let results = listings.filter(
      (listing) =>
        (city === "all" || listing.city === city) &&
        (type === "all" || listing.property_type === type) &&
        listing.price_per_night <= price[0] &&
        (!solar || listing.amenities.has_solar_power) &&
        (!privateOnly || listing.amenities.is_conservative_private),
    );

    if (sort === "price-asc") results = [...results].sort((a, b) => a.price_per_night - b.price_per_night);
    if (sort === "price-desc") results = [...results].sort((a, b) => b.price_per_night - a.price_per_night);
    return results;
  }, [city, type, price, solar, privateOnly, sort]);

  const clearFilters = () => {
    setCity("all");
    setType("all");
    setPrice([300]);
    setSolar(false);
    setPrivateOnly(false);
  };

  const Filters = (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="h-10 rounded-md bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">Property type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-10 rounded-md bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {propertyTypes.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">Max price</label>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-sm font-extrabold text-primary">
            ${price[0]}
          </span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={50} max={300} step={10} />
      </div>

      <div className="space-y-3 border-t border-border/70 pt-5">
        <p className="text-sm font-semibold text-foreground">Amenities</p>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox checked={solar} onCheckedChange={(value) => setSolar(!!value)} />
          <Sun className="h-4 w-4 text-primary" /> Solar power
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox checked={privateOnly} onCheckedChange={(value) => setPrivateOnly(!!value)} />
          <Shield className="h-4 w-4 text-primary" /> Conservative / Private
        </label>
      </div>

      <button
        onClick={clearFilters}
        className="flex items-center gap-1.5 text-sm font-bold text-link transition hover:text-primary"
      >
        <X className="h-4 w-4" /> Clear filters
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
            <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-link">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Villas in Syria</span>
              {city !== "all" && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{city}</span>
                </>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <MapPin className="h-4 w-4" /> Curated destinations
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                  Find your next private stay
                </h1>
              </div>
              <div className="rounded-lg border border-border/80 bg-background px-4 py-3 text-sm text-muted-foreground">
                <span className="font-extrabold text-foreground">{filtered.length}</span> stays available
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <aside
              className={`${showFilters ? "block" : "hidden"} h-fit rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:block`}
            >
              <h2 className="mb-5 text-base font-extrabold text-foreground">Filters</h2>
              {Filters}
            </aside>

            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-9 lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Showing <span className="font-bold text-foreground">{filtered.length}</span> villas
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="h-9 w-44 rounded-md bg-background text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: low to high</SelectItem>
                      <SelectItem value="price-desc">Price: high to low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-lg border border-border/80 bg-card p-10 text-center shadow-[var(--shadow-card)]">
                  <h2 className="text-lg font-bold text-foreground">No stays match these filters</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Try another city, property type, or price range.</p>
                  <Button onClick={clearFilters} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((listing) => (
                    <PropertyRow key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
