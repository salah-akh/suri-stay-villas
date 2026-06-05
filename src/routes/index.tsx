import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChevronRight, Star, Shield, HeartHandshake } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listings, cities, propertyTypes } from "@/data/listings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hajazna — Discover Exceptional Villas Across Syria" },
      { name: "description", content: "Find private villas, family retreats, and unique stays across Syria — from Damascus to the Mediterranean coast." },
      { property: "og:title", content: "Hajazna — Discover Exceptional Villas Across Syria" },
      { property: "og:description", content: "Find private villas, family retreats, and unique stays across Syria." },
    ],
  }),
  component: Index,
});

function Index() {
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");
  const navigate = Route.useNavigate();

  const featured = listings.slice(0, 8);
  const popular = ["Damascus", "Aleppo", "Latakia", "Palmyra", "Homs", "Tartus", "Bloudan", "Kassab"];

  const onSearch = () => {
    navigate({ to: "/listings", search: { city: city || undefined, type: type || undefined } as any });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Compact yellow search band */}
        <section className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
            <h1 className="text-lg font-extrabold text-primary-foreground sm:text-xl">
              Find your villa in Syria
            </h1>
            <p className="mt-0.5 text-xs text-primary-foreground/80 sm:text-sm">
              {listings.length}+ private villas, family retreats and unique stays
            </p>
            <div className="mt-4 grid gap-2 rounded-sm bg-card p-2 shadow-[var(--shadow-card)] sm:grid-cols-5">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-10 rounded-sm border-border"><SelectValue placeholder="All cities" /></SelectTrigger>
                <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-10 rounded-sm border-border"><SelectValue placeholder="Property type" /></SelectTrigger>
                <SelectContent>{propertyTypes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
              <Input type="date" className="h-10 rounded-sm" />
              <Input type="date" className="h-10 rounded-sm" />
              <Button onClick={onSearch} className="h-10 gap-2 rounded-sm bg-price text-white hover:bg-price/90">
                <Search className="h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </section>

        {/* Popular cities — chip rail */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
            <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Popular:</span>
            {popular.map((c) => (
              <Link
                key={c}
                to="/listings"
                search={{ city: c } as any}
                className="flex-shrink-0 rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-link hover:text-link"
              >
                {c}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured grid */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Featured Villas</h2>
            <Link to="/listings" className="flex items-center gap-0.5 text-xs font-semibold text-link hover:underline">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Why + testimonials in dense band */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
            {[
              { icon: Shield, t: "Verified Listings", d: "Every villa is personally inspected by our local team." },
              { icon: HeartHandshake, t: "Direct WhatsApp Booking", d: "Talk to a real host or our team — no middlemen, no fees." },
              { icon: Star, t: "Trusted by Travelers", d: "Hundreds of happy guests across Syria and the diaspora." },
            ].map((f) => (
              <div key={f.t} className="flex gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <f.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{f.t}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <h2 className="mb-4 text-base font-bold text-foreground">What guests say</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { n: "Layla H.", c: "Damascus", q: "The Damascene Heritage Villa felt like stepping into a dream. Every detail was authentic." },
                { n: "Omar A.", c: "Latakia", q: "Booking through WhatsApp was simple. The seaside villa exceeded expectations." },
                { n: "Nour & Family", c: "Bloudan", q: "Perfect family escape. Spotless chalet, breathtaking views, wonderful host." },
              ].map((t) => (
                <div key={t.n} className="rounded-sm border border-border bg-card p-4">
                  <div className="flex gap-0.5 text-price">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground">"{t.q}"</p>
                  <div className="mt-3 text-xs font-semibold text-foreground">{t.n} <span className="font-normal text-muted-foreground">· {t.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
