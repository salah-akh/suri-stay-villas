import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { CalendarDays, Grid2X2, MapPin, Plus, Ruler, Search, X } from "lucide-react";
import type { Listing } from "@/data/listings";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatCategoryPath,
  defaultAreaFromId,
  defaultDateFromId,
  defaultRoomFromId,
  listingCategories,
  listingNoFromId,
} from "@/lib/classifieds";
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
  const [category, setCategory] = useState("all");
  const { listings, cities, propertyTypes } = useListingsCatalog();

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedCategory = listingCategories.find((item) => item.id === category);

    return listings.filter((listing) => {
      const listingText = [
        listing.title,
        listing.description,
        listing.city,
        listing.region,
        listing.property_type,
        formatCategoryPath(listing.category_path),
        listing.room_count ?? "",
        listing.advertiser_type ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesCategory =
        !selectedCategory ||
        listing.property_type.toLowerCase().includes(selectedCategory.type.toLowerCase()) ||
        formatCategoryPath(listing.category_path)
          .toLowerCase()
          .includes(selectedCategory.title.toLowerCase()) ||
        (selectedCategory.id === "private-villa" &&
          listing.amenities.is_conservative_private);

      return (
        (!normalizedQuery || listingText.includes(normalizedQuery)) &&
        (city === "all" || listing.city === city) &&
        (type === "all" || listing.property_type === type) &&
        matchesCategory
      );
    });
  }, [listings, query, city, type, category]);

  const clearFilters = () => {
    setQuery("");
    setCity("all");
    setType("all");
    setCategory("all");
  };

  const countForCategory = (categoryType: string, categoryId: string, categoryTitle: string) =>
    listings.filter(
      (listing) =>
        listing.property_type.toLowerCase().includes(categoryType.toLowerCase()) ||
        formatCategoryPath(listing.category_path).toLowerCase().includes(categoryTitle.toLowerCase()) ||
        (categoryId === "private-villa" && listing.amenities.is_conservative_private),
    ).length;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="İlan no, villa, şehir, mahalle veya özellik ara"
                className="h-14 rounded-lg border-primary/20 bg-background pl-12 pr-4 text-base shadow-[var(--shadow-card)]"
                autoComplete="off"
              />
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-extrabold text-foreground">Kategoriler</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <CategoryCard
                  active={category === "all"}
                  title="Tüm Villa & Yazlık İlanları"
                  count={listings.length}
                  onClick={() => setCategory("all")}
                />
                {listingCategories.map((item) => (
                  <CategoryCard
                    key={item.id}
                    active={category === item.id}
                    title={item.title}
                    count={countForCategory(item.type, item.id, item.title)}
                    onClick={() => {
                      setCategory(item.id);
                      setType("all");
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <OptionGroup title="Villa tipi">
                <FilterChip label="Tüm tipler" active={type === "all"} onClick={() => setType("all")} />
                {propertyTypes.map((item) => (
                  <FilterChip
                    key={item}
                    label={item}
                    active={type === item}
                    onClick={() => setType(item)}
                  />
                ))}
              </OptionGroup>

              <OptionGroup title="Şehir">
                <FilterChip label="Tüm şehirler" active={city === "all"} onClick={() => setCity("all")} />
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
                  İlan başlığına basarak tüm detayları aç.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters} className="h-10 bg-card">
                  <X className="h-4 w-4" /> Temizle
                </Button>
                <Button asChild className="h-10 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/post-listing">
                    <Plus className="h-4 w-4" /> Ücretsiz ilan ver
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-border/80 bg-card p-8 text-center shadow-[var(--shadow-card)]">
              <MapPin className="mx-auto h-8 w-8 text-primary" />
              <h2 className="mt-3 text-lg font-bold text-foreground">İlan bulunamadı</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Arama kelimesini silin veya farklı bir kategori seçin.
              </p>
              <Button onClick={clearFilters} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                Tüm ilanları göster
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[var(--shadow-card)]">
              <div className="hidden grid-cols-[1fr_90px_90px_150px_110px_130px] gap-3 border-b border-border/80 bg-muted/60 px-4 py-3 text-xs font-extrabold uppercase text-muted-foreground lg:grid">
                <span>İlan başlığı</span>
                <span>m²</span>
                <span>Oda</span>
                <span>Konum</span>
                <span>Tarih</span>
                <span className="text-right">Fiyat</span>
              </div>
              <div className="divide-y divide-border/80">
                {filtered.map((listing) => (
                  <ClassifiedRow key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function CategoryCard({
  title,
  count,
  active,
  onClick,
}: {
  title: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-3 text-left transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/80 bg-background text-foreground hover:border-primary/40"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-current">
        <Grid2X2 className="h-4 w-4" />
      </span>
      <span className="mt-3 block text-sm font-extrabold">{title}</span>
      <span className={`mt-1 block text-xs ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
        {count} ilan
      </span>
    </button>
  );
}

function ClassifiedRow({ listing }: { listing: Listing }) {
  const listingNo = listing.listing_no ?? listingNoFromId(listing.id);
  const area = listing.area_m2 ?? defaultAreaFromId(listing.id);
  const room = listing.room_count ?? defaultRoomFromId(listing.id);
  const date = listing.published_at ?? defaultDateFromId(listing.id);

  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="grid gap-3 p-3 transition hover:bg-primary/5 lg:grid-cols-[1fr_90px_90px_150px_110px_130px] lg:items-center lg:px-4"
    >
      <div className="flex gap-3">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-24 w-28 shrink-0 rounded-md object-cover sm:h-28 sm:w-36 lg:h-20 lg:w-24"
        />
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-primary">{formatCategoryPath(listing.category_path)}</p>
          <h2 className="mt-1 line-clamp-2 text-base font-extrabold leading-snug text-foreground">
            {listing.title}
          </h2>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">İlan No: {listingNo}</p>
          <p className="mt-2 line-clamp-1 text-xs text-muted-foreground lg:hidden">
            {area} m² · {room} · {listing.city} / {listing.region}
          </p>
        </div>
      </div>

      <MetaCell icon={<Ruler className="h-3.5 w-3.5" />} value={`${area} m²`} />
      <MetaCell icon={<Grid2X2 className="h-3.5 w-3.5" />} value={room} />
      <MetaCell icon={<MapPin className="h-3.5 w-3.5" />} value={`${listing.city} / ${listing.region}`} />
      <MetaCell icon={<CalendarDays className="h-3.5 w-3.5" />} value={date} />

      <div className="text-left lg:text-right">
        <div className="text-xl font-extrabold text-price">${listing.price_per_night}</div>
        <div className="text-xs text-muted-foreground">gece</div>
      </div>
    </Link>
  );
}

function MetaCell({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="hidden items-center gap-1.5 text-sm font-semibold text-muted-foreground lg:flex">
      <span className="text-primary">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function OptionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-extrabold text-foreground">{title}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">{children}</div>
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
