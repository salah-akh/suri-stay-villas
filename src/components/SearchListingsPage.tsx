import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CalendarDays,
  ChevronRight,
  Grid2X2,
  Home,
  MapPin,
  Plus,
  Ruler,
  Search,
  X,
} from "lucide-react";
import type { Listing } from "@/data/listings";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  advertiserTypes,
  defaultAreaFromId,
  defaultDateFromId,
  defaultRoomFromId,
  formatCategoryPath,
  listingCategories,
  listingNoFromId,
} from "@/lib/classifieds";
import { useListingsCatalog } from "@/lib/listing-store";

type SortValue = "default" | "price-asc" | "price-desc";

type SearchListingsPageProps = {
  mode?: "home" | "results";
  initialQuery?: string;
  initialCity?: string;
  initialType?: string;
  initialCategory?: string;
  initialAdvertiser?: string;
  initialSort?: SortValue;
};

export function SearchListingsPage({
  mode = "home",
  initialQuery = "",
  initialCity = "all",
  initialType = "all",
  initialCategory = "all",
  initialAdvertiser = "all",
  initialSort = "default",
}: SearchListingsPageProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity || "all");
  const [type, setType] = useState(initialType || "all");
  const [category, setCategory] = useState(normalizeCategory(initialCategory));
  const [advertiser, setAdvertiser] = useState(initialAdvertiser || "all");
  const [sort, setSort] = useState<SortValue>(initialSort);
  const { listings, cities, propertyTypes } = useListingsCatalog();
  const isResultsMode = mode === "results";

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCity(initialCity || "all");
  }, [initialCity]);

  useEffect(() => {
    setType(initialType || "all");
  }, [initialType]);

  useEffect(() => {
    setCategory(normalizeCategory(initialCategory));
  }, [initialCategory]);

  useEffect(() => {
    setAdvertiser(initialAdvertiser || "all");
  }, [initialAdvertiser]);

  useEffect(() => {
    setSort(initialSort);
  }, [initialSort]);

  const countForCategory = (categoryType: string, categoryId: string, categoryTitle: string) =>
    listings.filter(
      (listing) =>
        listing.property_type.toLowerCase().includes(categoryType.toLowerCase()) ||
        formatCategoryPath(listing.category_path).toLowerCase().includes(categoryTitle.toLowerCase()) ||
        (categoryId === "private-villa" && listing.amenities.is_conservative_private),
    ).length;

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedCategory = listingCategories.find((item) => item.id === category);

    const results = listings.filter((listing) => {
      const listingText = [
        listing.listing_no ?? listingNoFromId(listing.id),
        listing.title,
        listing.description,
        listing.city,
        listing.region,
        listing.property_type,
        formatCategoryPath(listing.category_path),
        listing.room_count ?? "",
        listing.advertiser_type ?? advertiserTypes[0],
      ]
        .join(" ")
        .toLowerCase();

      const matchesCategory =
        !selectedCategory ||
        listing.property_type.toLowerCase().includes(selectedCategory.type.toLowerCase()) ||
        formatCategoryPath(listing.category_path)
          .toLowerCase()
          .includes(selectedCategory.title.toLowerCase()) ||
        (selectedCategory.id === "private-villa" && listing.amenities.is_conservative_private);

      const listingAdvertiser = listing.advertiser_type ?? advertiserTypes[0];

      return (
        (!normalizedQuery || listingText.includes(normalizedQuery)) &&
        (city === "all" || listing.city === city) &&
        (type === "all" || listing.property_type === type) &&
        (advertiser === "all" || listingAdvertiser === advertiser) &&
        matchesCategory
      );
    });

    if (sort === "price-asc") {
      return [...results].sort((first, second) => first.price_per_night - second.price_per_night);
    }

    if (sort === "price-desc") {
      return [...results].sort((first, second) => second.price_per_night - first.price_per_night);
    }

    return results;
  }, [listings, query, city, type, category, advertiser, sort]);

  const clearFilters = () => {
    setQuery("");
    setCity("all");
    setType("all");
    setCategory("all");
    setAdvertiser("all");
    setSort("default");
  };

  const selectCategory = (nextCategory: string) => {
    const normalizedCategory = normalizeCategory(nextCategory);

    if (!isResultsMode) {
      void navigate({
        to: "/listings",
        search: normalizedCategory === "all" ? {} : { category: normalizedCategory },
      });
      return;
    }

    setCategory(normalizedCategory);
    setType("all");
  };

  const selectedCategoryTitle =
    category === "all"
      ? "Tum Villa & Yazlik"
      : listingCategories.find((item) => item.id === category)?.title ?? "Ilanlar";

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/70 bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-primary">
                  {isResultsMode ? "Kategori ilanlari" : "Villa ve yazlik ilan pazari"}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">
                  {isResultsMode ? selectedCategoryTitle : "Aradigin ilani kolayca bul"}
                </h1>
              </div>
              <div className="hidden lg:block">
                <Button asChild className="h-11 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/post-listing">
                    <Plus className="h-4 w-4" /> Ucretsiz ilan ver
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ilan no, villa, sehir, mahalle veya ozellik ara"
                className="h-14 rounded-lg border-primary/20 bg-background pl-12 pr-4 text-base shadow-[var(--shadow-card)]"
                autoComplete="off"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 sm:py-7 lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:block">
            <SidebarTitle icon={<Home className="h-4 w-4" />} title="Kategoriler" />
            <div className="mt-3 space-y-1">
              <SidebarButton
                active={category === "all"}
                label="Tum Villa & Yazlik"
                count={listings.length}
                onClick={() => selectCategory("all")}
              />
              {listingCategories.map((item) => (
                <SidebarButton
                  key={item.id}
                  active={category === item.id}
                  label={item.title}
                  count={countForCategory(item.type, item.id, item.title)}
                  onClick={() => selectCategory(item.id)}
                />
              ))}
            </div>

            <div className="mt-5 border-t border-border/70 pt-5">
              <SidebarTitle icon={<MapPin className="h-4 w-4" />} title="Sehir" />
              <div className="mt-3 space-y-1">
                <SidebarButton active={city === "all"} label="Tum sehirler" onClick={() => setCity("all")} />
                {cities.map((item) => (
                  <SidebarButton
                    key={item}
                    active={city === item}
                    label={item}
                    onClick={() => setCity(item)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border/70 pt-5">
              <SidebarTitle icon={<Grid2X2 className="h-4 w-4" />} title="Ilan tipi" />
              <div className="mt-3 space-y-1">
                <SidebarButton active={type === "all"} label="Tum tipler" onClick={() => setType("all")} />
                {propertyTypes.map((item) => (
                  <SidebarButton
                    key={item}
                    active={type === item}
                    label={item}
                    onClick={() => setType(item)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border/70 pt-5">
              <SidebarTitle icon={<Home className="h-4 w-4" />} title="Ilan veren" />
              <div className="mt-3 space-y-1">
                <SidebarButton active={advertiser === "all"} label="Tum ilan verenler" onClick={() => setAdvertiser("all")} />
                {advertiserTypes.map((item) => (
                  <SidebarButton
                    key={item}
                    active={advertiser === item}
                    label={item}
                    onClick={() => setAdvertiser(item)}
                  />
                ))}
              </div>
            </div>

            <Button variant="outline" onClick={clearFilters} className="mt-5 w-full bg-background">
              <X className="h-4 w-4" /> Filtreleri temizle
            </Button>
          </aside>

          <div className="min-w-0">
            {!isResultsMode && (
              <div className="lg:hidden">
                <p className="px-1 text-sm font-extrabold text-foreground">Kategoriler</p>
                <div className="mt-2 divide-y divide-border/70">
                  <MobileCategoryRow
                    active={category === "all"}
                    label="Tum Villa & Yazlik"
                    description="Tum kiralik villa ve yazlik ilanlari."
                    count={listings.length}
                    onClick={() => selectCategory("all")}
                  />
                  {listingCategories.map((item) => (
                    <MobileCategoryRow
                      key={item.id}
                      label={item.title}
                      description={getCategoryDescription(item.id)}
                      active={category === item.id}
                      count={countForCategory(item.type, item.id, item.title)}
                      onClick={() => selectCategory(item.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className={isResultsMode ? "block" : "hidden lg:block"}>
              {isResultsMode && (
                <MobileResultsFilters
                  category={category}
                  city={city}
                  type={type}
                  sort={sort}
                  cities={cities}
                  propertyTypes={propertyTypes}
                  onCategoryChange={selectCategory}
                  onCityChange={setCity}
                  onTypeChange={setType}
                  onSortChange={setSort}
                  onClear={clearFilters}
                />
              )}

              <div className="mb-4 rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-extrabold text-foreground">{filtered.length} ilan bulundu</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Kategoriden sec, ilana bas, detay ve iletisim bilgilerini gor.
                    </p>
                  </div>
                  <div className="hidden flex-wrap gap-2 lg:flex">
                    <SortButton active={sort === "default"} label="Varsayilan" onClick={() => setSort("default")} />
                    <SortButton active={sort === "price-asc"} label="Ucuzdan pahaliya" onClick={() => setSort("price-asc")} />
                    <SortButton active={sort === "price-desc"} label="Pahalidan ucuza" onClick={() => setSort("price-desc")} />
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-lg border border-border/80 bg-card p-8 text-center shadow-[var(--shadow-card)]">
                  <MapPin className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-lg font-bold text-foreground">Ilan bulunamadi</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Arama kelimesini silin veya farkli bir kategori secin.
                  </p>
                  <Button onClick={clearFilters} className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
                    Tum ilanlari goster
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-[var(--shadow-card)]">
                  <div className="hidden grid-cols-[1fr_90px_90px_150px_110px_130px] gap-3 border-b border-border/80 bg-muted/60 px-4 py-3 text-xs font-extrabold uppercase text-muted-foreground lg:grid">
                    <span>Ilan basligi</span>
                    <span>m2</span>
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
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function getCategoryDescription(categoryId: string) {
  const descriptions: Record<string, string> = {
    "daily-villa": "Gunluk kiralanabilen mustakil villalar.",
    "summer-house": "Tatil ve sezonluk yazlik konaklamalar.",
    "beach-villa": "Denize yakin sahil bolgesi ilanlari.",
    "private-villa": "Aileye uygun, daha ozel havuzlu ilanlar.",
    "mountain-house": "Dag ve doga icinde sakin konaklamalar.",
    bungalow: "Kucuk, pratik ve dogaya yakin konaklamalar.",
  };

  return descriptions[categoryId] ?? "Bu kategoriye ait kiralik konaklamalar.";
}

function normalizeCategory(categoryId?: string) {
  if (!categoryId || categoryId === "all") return "all";

  return listingCategories.some((item) => item.id === categoryId) ? categoryId : "all";
}

function MobileResultsFilters({
  category,
  city,
  type,
  sort,
  cities,
  propertyTypes,
  onCategoryChange,
  onCityChange,
  onTypeChange,
  onSortChange,
  onClear,
}: {
  category: string;
  city: string;
  type: string;
  sort: SortValue;
  cities: string[];
  propertyTypes: string[];
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: SortValue) => void;
  onClear: () => void;
}) {
  return (
    <div className="mb-4 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-card)] lg:hidden">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-foreground">Filtrele ve sirala</p>
          <p className="mt-1 text-xs text-muted-foreground">Sonuclari daralt, fiyata gore sirala.</p>
        </div>
        <Button variant="outline" onClick={onClear} className="h-9 bg-background px-3 text-xs font-bold">
          <X className="h-4 w-4" /> Temizle
        </Button>
      </div>

      <div className="grid gap-3">
        <MobileSelect label="Kategori" value={category} onChange={onCategoryChange}>
          <option value="all">Tum Villa & Yazlik</option>
          {listingCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </MobileSelect>

        <div className="grid grid-cols-2 gap-3">
          <MobileSelect label="Sehir" value={city} onChange={onCityChange}>
            <option value="all">Tum sehirler</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </MobileSelect>

          <MobileSelect label="Ilan tipi" value={type} onChange={onTypeChange}>
            <option value="all">Tum tipler</option>
            {propertyTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </MobileSelect>
        </div>

        <MobileSelect
          label="Siralama"
          value={sort}
          onChange={(value) => onSortChange(value as SortValue)}
        >
          <option value="default">Varsayilan</option>
          <option value="price-asc">Ucuzdan pahaliya</option>
          <option value="price-desc">Pahalidan ucuza</option>
        </MobileSelect>
      </div>
    </div>
  );
}

function MobileSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-md border border-border/80 bg-background px-3 text-sm font-bold text-foreground outline-none transition focus:border-primary"
      >
        {children}
      </select>
    </label>
  );
}

function MobileCategoryRow({
  label,
  description,
  count,
  active,
  onClick,
}: {
  label: string;
  description: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 px-1 py-3.5 text-left transition ${
        active ? "text-primary" : "text-foreground"
      }`}
    >
      <span
        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Home className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="text-sm font-extrabold">{label}</span>
          <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
            {count}
          </span>
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span>
      </span>
      <ChevronRight className="mt-3 h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

function SidebarTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
      <span className="text-primary">{icon}</span>
      {title}
    </p>
  );
}

function SidebarButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span className="min-w-0 truncate">{label}</span>
      <span className="flex shrink-0 items-center gap-1 text-xs">
        {typeof count === "number" && count}
        <ChevronRight className="h-3 w-3" />
      </span>
    </button>
  );
}

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-md border px-3 text-xs font-bold transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/80 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
      }`}
    >
      {label}
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
          <p className="mt-1 text-xs font-semibold text-muted-foreground">Ilan No: {listingNo}</p>
          <p className="mt-2 line-clamp-1 text-xs text-muted-foreground lg:hidden">
            {area} m2 - {room} - {listing.city} / {listing.region}
          </p>
        </div>
      </div>

      <MetaCell icon={<Ruler className="h-3.5 w-3.5" />} value={`${area} m2`} />
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
