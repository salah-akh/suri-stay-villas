import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { BadgeCheck, MapPin, MessageCircle, Plus, Search } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListingsCatalog } from "@/lib/listing-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hajazna - Villa ve Yazlik Kiralama" },
      {
        name: "description",
        content: "Villa, yazlik ve ozel konaklama yerlerini sade bir uygulama deneyimiyle bulun.",
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
  const featured = useMemo(() => listings.slice(0, 6), [listings]);

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
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-primary">Villa ve yazlik kiralama</p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                  Sana uygun kiralik villayi bul
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Ne yapmak istiyorsan asagidan sec. Uygulama seni adim adim yonlendirir.
                </p>
              </div>
              <Button asChild variant="outline" className="h-11 bg-background">
                <Link to="/post-listing">
                  <Plus className="h-4 w-4" /> Ilan ver
                </Link>
              </Button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <QuickAction
                to="/listings"
                icon={<Search className="h-5 w-5" />}
                title="Villa bul"
                text="Ilanlari gor ve begendigine bas."
              />
              <QuickAction
                to="/post-listing"
                icon={<Plus className="h-5 w-5" />}
                title="Ilan ver"
                text="Fotograf yukle, bilgileri yaz, yayinla."
              />
              <QuickAction
                to="/contact"
                icon={<MessageCircle className="h-5 w-5" />}
                title="Destek al"
                text="Takildigin yerde bize yaz."
              />
            </div>

            <div className="mt-5 rounded-lg border border-border/80 bg-background p-3 shadow-[var(--shadow-card)]">
              <p className="mb-3 text-sm font-extrabold text-foreground">Hizli arama</p>
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
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

                <Button onClick={onSearch} className="h-12 min-w-32 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Search className="h-4 w-4" /> Ilanlari goster
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Son ilanlar</p>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">Kiralik villalar</h2>
            </div>
            <Link to="/listings" className="text-sm font-bold text-link hover:underline">
              Tumunu gor
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function QuickAction({
  to,
  icon,
  title,
  text,
}: {
  to: "/listings" | "/post-listing" | "/contact";
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-lg border border-border/80 bg-background p-4 shadow-[var(--shadow-card)] transition hover:border-primary/40"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <h2 className="mt-3 text-base font-extrabold text-foreground">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </Link>
  );
}
