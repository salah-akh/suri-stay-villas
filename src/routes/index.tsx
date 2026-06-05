import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
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
      { title: "Hajazna - Villa ve Yazlik Kiralama" },
      {
        name: "description",
        content: "Villa, yazlik ve ozel konaklama yerlerini sehir, tarih ve tipe gore arayin.",
      },
      { property: "og:title", content: "Hajazna - Villa ve Yazlik Kiralama" },
      {
        property: "og:description",
        content: "Villa, yazlik ve ozel konaklama yerlerini kolayca bulun.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [city, setCity] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const navigate = Route.useNavigate();

  const featured = listings.slice(0, 6);
  const popular = ["Damascus", "Aleppo", "Latakia", "Palmyra", "Homs", "Tartus", "Bloudan", "Kassab"];
  const quickTypes = propertyTypes.slice(0, 6);
  const cityHighlights = cities.slice(0, 6).map((item) => ({
    city: item,
    count: listings.filter((listing) => listing.city === item).length,
  }));

  const onSearch = () => {
    navigate({
      to: "/listings",
      search: {
        city: city === "all" ? undefined : city,
        type: type === "all" ? undefined : type,
      } as any,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary">Villa ve yazlik kiralama</p>
              <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">
                Nereye gitmek istiyorsun?
              </h1>
            </div>
            <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full bg-card">
              <Link to="/listings" aria-label="Filtreleri ac">
                <SlidersHorizontal className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-5 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-elegant)] sm:p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.9fr_0.9fr_auto]">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-12 rounded-md bg-background">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Sehir sec" />
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
                  <SelectTrigger className="h-12 rounded-md bg-background">
                    <BadgeCheck className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Konaklama tipi" />
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

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input type="date" aria-label="Giris tarihi" className="h-12 rounded-md bg-background pl-9" />
                </div>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input type="date" aria-label="Cikis tarihi" className="h-12 rounded-md bg-background pl-9" />
                </div>

                <Button onClick={onSearch} className="h-12 min-w-36 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Search className="h-4 w-4" /> Ara
                </Button>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                <span className="shrink-0 rounded-md bg-muted px-3 py-1.5 text-sm font-semibold text-muted-foreground">
                  Populer
                </span>
                {popular.map((item) => (
                  <Link
                    key={item}
                    to="/listings"
                    search={{ city: item } as any}
                    className="shrink-0 rounded-md border border-border/80 bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <AdSlot slotId="home-inline" />
        </div>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Hizli filtreler</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">Yazlik tarzini sec</h2>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickTypes.map((item) => (
              <Link
                key={item}
                to="/listings"
                search={{ type: item } as any}
                className="shrink-0 rounded-md border border-border/80 bg-card px-4 py-3 text-sm font-bold text-foreground shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">One cikanlar</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                Bugun bakabilecegin villalar
              </h2>
            </div>
            <Link to="/listings" className="flex shrink-0 items-center gap-1 text-sm font-bold text-link hover:underline">
              Hepsi <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Sehre gore kesfet</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">Populer lokasyonlar</h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cityHighlights.map((item) => (
              <Link
                key={item.city}
                to="/listings"
                search={{ city: item.city } as any}
                className="flex items-center justify-between rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:text-primary"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-extrabold text-foreground">{item.city}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.count} ilan</p>
                  </div>
                </div>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
