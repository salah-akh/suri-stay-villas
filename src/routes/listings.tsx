import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Sun, Shield, SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyRow } from "@/components/PropertyCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { listings, cities, propertyTypes } from "@/data/listings";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute("/listings")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Villas — Hajazna" },
      { name: "description", content: "Browse premium villas and vacation rentals across Syria. Filter by city, price, and amenities." },
      { property: "og:title", content: "All Villas — Hajazna" },
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
    let r = listings.filter((l) =>
    (city === "all" || l.city === city) &&
    (type === "all" || l.property_type === type) &&
    l.price_per_night <= price[0] &&
    (!solar || l.amenities.has_solar_power) &&
    (!privateOnly || l.amenities.is_conservative_private)
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price_per_night - b.price_per_night);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price_per_night - a.price_per_night);
    return r;
  }, [city, type, price, solar, privateOnly, sort]);

  const Filters = (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="h-9 rounded-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Property Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-9 rounded-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {propertyTypes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Max Price / night</label>
          <span className="text-sm font-bold text-price">${price[0]}</span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={50} max={300} step={10} />
      </div>
      <div className="space-y-2.5 border-t border-border pt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amenities</p>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox checked={solar} onCheckedChange={(v) => setSolar(!!v)} />
          <Sun className="h-3.5 w-3.5 text-muted-foreground" /> Solar power
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox checked={privateOnly} onCheckedChange={(v) => setPrivateOnly(!!v)} />
          <Shield className="h-3.5 w-3.5 text-muted-foreground" /> Conservative / Private
        </label>
      </div>
      <button
        onClick={() => { setCity("all"); setType("all"); setPrice([300]); setSolar(false); setPrivateOnly(false); }}
        className="flex items-center gap-1 text-xs font-semibold text-link hover:underline"
      >
        <X className="h-3 w-3" /> Clear filters
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 text-xs text-muted-foreground sm:px-6">
            <Link to="/" className="hover:text-link">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Villas in Syria</span>
            {city !== "all" && (<>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{city}</span>
            </>)}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            {/* Sidebar filters */}
            <aside className={`${showFilters ? "block" : "hidden"} h-fit rounded-sm border border-border bg-card p-4 lg:sticky lg:top-24 lg:block`}>
              <h2 className="mb-3 border-b border-border pb-2 text-sm font-bold uppercase tracking-wide text-foreground">Filters</h2>
              {Filters}
            </aside>

            <div className="min-w-0">
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-sm border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8 gap-1.5 rounded-sm lg:hidden">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                  </Button>
                  <span className="text-sm">
                    <span className="font-bold text-foreground">{filtered.length}</span>
                    <span className="text-muted-foreground"> results</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Sort by</label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="h-8 w-44 rounded-sm text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: low to high</SelectItem>
                      <SelectItem value="price-desc">Price: high to low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results list */}
              {filtered.length === 0 ? (
                <div className="rounded-sm border border-border bg-card p-10 text-center text-sm text-muted-foreground">
                  No properties match your filters.
                </div>
              ) : (
                <div className="overflow-hidden rounded-sm border border-border bg-card">
                  {filtered.map((l) => <PropertyRow key={l.id} listing={l} />)}
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