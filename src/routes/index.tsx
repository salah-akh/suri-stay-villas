import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Sun, Shield, Sparkles, HeartHandshake, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
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
      { title: "SuriStay — Discover Exceptional Villas Across Syria" },
      { name: "description", content: "Find private villas, family retreats, and unique stays across Syria — from Damascus to the Mediterranean coast." },
      { property: "og:title", content: "SuriStay — Discover Exceptional Villas Across Syria" },
      { property: "og:description", content: "Find private villas, family retreats, and unique stays across Syria." },
    ],
  }),
  component: Index,
});

function Index() {
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");
  const navigate = Route.useNavigate();

  const featured = listings.slice(0, 6);
  const popular = ["Damascus", "Aleppo", "Latakia", "Palmyra"];

  const onSearch = () => {
    navigate({ to: "/listings", search: { city: city || undefined, type: type || undefined } as any });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden">
          <img src={heroImg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center text-white animate-fade-in">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Authentic Syrian Hospitality
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
              Discover Exceptional<br />Villas Across Syria
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
              Find private villas, family retreats, and unique stays — from heritage homes in Old Damascus to mountain chalets and Mediterranean coastlines.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-background p-3 text-foreground shadow-[var(--shadow-elegant)] sm:p-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="border-0 bg-muted/40 lg:col-span-1"><SelectValue placeholder="City" /></SelectTrigger>
                  <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="border-0 bg-muted/40"><SelectValue placeholder="Property type" /></SelectTrigger>
                  <SelectContent>{propertyTypes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="date" className="border-0 bg-muted/40" />
                <Input type="date" className="border-0 bg-muted/40" />
                <Button onClick={onSearch} className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Featured</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Handpicked villas</h2>
            </div>
            <Link to="/listings" className="hidden text-sm font-medium text-primary hover:underline sm:inline">View all →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Why Choose */}
        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Why SuriStay</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">A new standard for stays in Syria</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { icon: Shield, t: "Verified Properties", d: "Every villa is personally vetted for safety, quality, and authenticity." },
                { icon: HeartHandshake, t: "Local Expertise", d: "Our team is on the ground — providing real support before and during your stay." },
                { icon: Sun, t: "Reliable Comfort", d: "Many of our villas feature solar power and backup essentials, so your stay is uninterrupted." },
              ].map((f) => (
                <div key={f.t} className="rounded-2xl bg-card p-7 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-display font-semibold">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Destinations</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Popular places to stay</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((c, i) => {
              const sample = listings.find((l) => l.city === c)!;
              return (
                <Link
                  key={c}
                  to="/listings"
                  search={{ city: c } as any}
                  className="group relative h-72 overflow-hidden rounded-2xl"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <img src={sample.image_url} alt={c} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-1 text-xs opacity-90"><MapPin className="h-3 w-3" /> Syria</div>
                    <h3 className="mt-1 font-display text-2xl font-semibold">{c}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary py-20 text-secondary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Loved by guests</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Stories from our travelers</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { n: "Layla H.", c: "Damascus", q: "The Damascene Heritage Villa felt like stepping into a dream. Every detail was authentic and beautifully maintained." },
                { n: "Omar A.", c: "Latakia", q: "Booking through WhatsApp made everything so simple. The seaside villa exceeded all expectations." },
                { n: "Nour & Family", c: "Bloudan", q: "Perfect family escape. The chalet was spotless, the views were breathtaking, and the host was wonderful." },
              ].map((t) => (
                <div key={t.n} className="rounded-2xl bg-white/5 p-7 backdrop-blur">
                  <div className="flex gap-0.5 text-primary-glow">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">"{t.q}"</p>
                  <div className="mt-5 text-sm font-semibold">{t.n} <span className="font-normal opacity-70">· {t.c}</span></div>
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
