import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Sun, Shield, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyCard } from "@/components/PropertyCard";
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
      { title: "All Villas — SuriStay" },
      { name: "description", content: "Browse premium villas and vacation rentals across Syria. Filter by city, price, and amenities." },
      { property: "og:title", content: "All Villas — SuriStay" },
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

  const filtered = useMemo(() => listings.filter((l) =>
    (city === "all" || l.city === city) &&
    (type === "all" || l.property_type === type) &&
    l.price_per_night <= price[0] &&
    (!solar || l.amenities.has_solar_power) &&
    (!privateOnly || l.amenities.is_conservative_private)
  ), [city, type, price, solar, privateOnly]);

  const Filters = (
    <div className="space-y-7">
      <div>
        <label className="mb-2 block text-sm font-medium">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Property Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {propertyTypes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">Max Price / night</label>
          <span className="text-sm font-semibold text-primary">${price[0]}</span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={50} max={300} step={10} />
      </div>
      <div className="space-y-3 border-t border-border/60 pt-5">
        <label className="flex items-center gap-3 text-sm">
          <Checkbox checked={solar} onCheckedChange={(v) => setSolar(!!v)} />
          <Sun className="h-4 w-4 text-primary" /> Solar Power Available
        </label>
        <label className="flex items-center gap-3 text-sm">
          <Checkbox checked={privateOnly} onCheckedChange={(v) => setPrivateOnly(!!v)} />
          <Shield className="h-4 w-4 text-primary" /> Conservative / Private
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Villas in Syria</h1>
            <p className="mt-2 text-muted-foreground">{filtered.length} stays available</p>
          </div>

          <div className="mb-5 flex lg:hidden">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className={`${showFilters ? "block" : "hidden"} h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:block`}>
              <h2 className="mb-5 font-display text-lg font-semibold">Filters</h2>
              {Filters}
            </aside>

            <div>
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border/60 bg-card p-12 text-center">
                  <p className="text-muted-foreground">No properties match your filters.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((l) => <PropertyCard key={l.id} listing={l} />)}
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