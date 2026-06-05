import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  HeartHandshake,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities, listings, propertyTypes } from "@/data/listings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hajazna - Discover Exceptional Villas Across Syria" },
      {
        name: "description",
        content:
          "Find private villas, family retreats, and unique stays across Syria, from Damascus to the Mediterranean coast.",
      },
      { property: "og:title", content: "Hajazna - Discover Exceptional Villas Across Syria" },
      {
        property: "og:description",
        content: "Find private villas, family retreats, and unique stays across Syria.",
      },
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
        <section className="relative isolate overflow-hidden bg-secondary text-white">
          <img
            src={heroImage}
            alt="Villa terrace with pool at sunset"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/75 to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-transparent to-black/20" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 pb-28 sm:px-6 sm:py-24 sm:pb-32 lg:py-28">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary-glow" />
                Curated Syrian stays
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
                Private villas across Syria
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                Heritage homes, coastal villas, and quiet mountain retreats selected for comfort,
                privacy, and memorable stays.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/listings">
                    <Search className="h-4 w-4" /> Explore villas
                  </Link>
                </Button>
                <Link
                  to="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  List your villa
                </Link>
              </div>

              <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { value: `${listings.length}+`, label: "verified villas" },
                  { value: "8", label: "destinations" },
                  { value: "24h", label: "booking help" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                    <div className="text-xl font-extrabold">{item.value}</div>
                    <div className="mt-1 text-xs text-white/70">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-background">
          <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
            <div className="-mt-12 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-elegant)] sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.9fr_0.9fr_auto]">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-12 rounded-md bg-background">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-12 rounded-md bg-background">
                    <BadgeCheck className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input type="date" aria-label="Check in" className="h-12 rounded-md bg-background pl-9" />
                </div>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input type="date" aria-label="Check out" className="h-12 rounded-md bg-background pl-9" />
                </div>

                <Button onClick={onSearch} className="h-12 min-w-36 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">Popular</span>
                {popular.map((item) => (
                  <Link
                    key={item}
                    to="/listings"
                    search={{ city: item } as any}
                    className="rounded-md border border-border/80 bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Featured collection</p>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
                Villas guests ask for first
              </h2>
            </div>
            <Link to="/listings" className="flex items-center gap-1 text-sm font-bold text-link hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="bg-secondary text-secondary-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Verified homes",
                description: "Every villa is reviewed for photos, amenities, location, and guest readiness.",
              },
              {
                icon: HeartHandshake,
                title: "Human booking help",
                description: "Message our team directly and confirm stay details before you travel.",
              },
              {
                icon: Star,
                title: "Memorable stays",
                description: "Choose from heritage courtyards, beach villas, mountain chalets, and family estates.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/72">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary">Guest notes</p>
            <h2 className="mt-2 text-2xl font-extrabold text-foreground">What travelers remember</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Layla H.",
                city: "Damascus",
                quote: "The Damascene Heritage Villa felt personal, calm, and beautifully kept.",
              },
              {
                name: "Omar A.",
                city: "Latakia",
                quote: "Booking through WhatsApp was simple. The seaside villa exceeded expectations.",
              },
              {
                name: "Nour & Family",
                city: "Bloudan",
                quote: "A spotless chalet with mountain views, easy check-in, and a wonderful host.",
              },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-foreground">"{item.quote}"</p>
                <div className="mt-4 text-sm font-bold text-foreground">
                  {item.name} <span className="font-medium text-muted-foreground">/ {item.city}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
