import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  Home,
  MapPin,
  Mountain,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Waves,
} from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { PropertyCard } from "@/components/PropertyCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListingsCatalog } from "@/lib/listing-store";

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
  const { listings, cities, propertyTypes } = useListingsCatalog();

  const featured = listings.slice(0, 6);
  const urgentListings = listings.slice(0, 3);
  const popular = ["Damascus", "Aleppo", "Latakia", "Palmyra", "Homs", "Tartus", "Bloudan", "Kassab"];
  const categoryIcons = [Home, Waves, Mountain, BadgeCheck, Star, Heart];
  const quickCategories = propertyTypes.slice(0, 6).map((item, index) => ({
    label: item,
    icon: categoryIcons[index % categoryIcons.length],
    count: listings.filter((listing) => listing.property_type === item).length,
  }));
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
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-primary">Villa ve yazlik ilan pazari</p>
                <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                  Kiralik villani kolayca bul
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Sehir, tarih, fiyat ve konaklama tipine gore hizli arama yapin.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild className="h-11 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/post-listing">
                    <Plus className="h-4 w-4" /> Ilan ver
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 bg-background">
                  <Link to="/listings">
                    <SlidersHorizontal className="h-4 w-4" /> Detayli arama
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-border/80 bg-background p-3 shadow-[var(--shadow-card)] sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.9fr_0.9fr_auto]">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-12 rounded-md bg-card">
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
                  <SelectTrigger className="h-12 rounded-md bg-card">
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
                  <Input type="date" aria-label="Giris tarihi" className="h-12 rounded-md bg-card pl-9" />
                </div>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input type="date" aria-label="Cikis tarihi" className="h-12 rounded-md bg-card pl-9" />
                </div>

                <Button onClick={onSearch} className="h-12 min-w-36 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Search className="h-4 w-4" /> Ara
                </Button>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {[
                  { label: "Acil ilanlar", icon: Clock },
                  { label: "Yeni eklenenler", icon: Star },
                  { label: "Sahile yakin", icon: Waves },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to="/listings"
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border/80 bg-card px-3 py-2 text-sm font-bold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    <item.icon className="h-4 w-4 text-primary" /> {item.label}
                  </Link>
                ))}
                {popular.map((item) => (
                  <Link
                    key={item}
                    to="/listings"
                    search={{ city: item } as any}
                    className="shrink-0 rounded-md border border-border/80 bg-card px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-4 pt-5 sm:px-6">
          <AdSlot slotId="home-inline" />
        </div>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Kategoriler</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">Ilan tipini sec</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickCategories.map((item) => (
              <Link
                key={item.label}
                to="/listings"
                search={{ type: item.label } as any}
                className="group rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="mt-3 block line-clamp-2 text-sm font-extrabold text-foreground">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{item.count} ilan</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Acil vitrin</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">Hemen bakilacak ilanlar</h2>
            </div>
            <Link to="/listings" className="flex shrink-0 items-center gap-1 text-sm font-bold text-link hover:underline">
              Tum aciller <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {urgentListings.map((listing) => (
              <Link
                key={listing.id}
                to="/listings/$id"
                params={{ id: listing.id }}
                className="flex gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-card)] transition hover:border-primary/40"
              >
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="h-20 w-24 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-extrabold text-primary">
                    Acil
                  </span>
                  <h3 className="mt-2 line-clamp-2 text-sm font-extrabold text-foreground">
                    {listing.title}
                  </h3>
                  <p className="mt-1 text-sm font-extrabold text-price">
                    ${listing.price_per_night} / gece
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Vitrindeki ilanlar</p>
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
