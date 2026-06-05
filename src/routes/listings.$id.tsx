import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Ruler,
  Share2,
  Users,
} from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { listings } from "@/data/listings";
import { useUserListings } from "@/lib/listing-store";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }) => {
    const listing = listings.find((item) => item.id === params.id);
    return { listing, id: params.id };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.listing
      ? [
          { title: `${loaderData.listing.title} - Hajazna` },
          { name: "description", content: loaderData.listing.description },
          { property: "og:title", content: loaderData.listing.title },
          { property: "og:description", content: loaderData.listing.description },
          { property: "og:image", content: loaderData.listing.image_url },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-foreground">Ilan bulunamadi</h1>
        <Link to="/listings" className="mt-4 inline-block text-primary hover:underline">
          Ilanlara don
        </Link>
      </div>
    </div>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const { listing: staticListing, id } = Route.useLoaderData();
  const [userListings] = useUserListings();
  const listing = staticListing ?? userListings.find((item) => item.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-extrabold text-foreground">
              {id.startsWith("user-") ? "Ilan yukleniyor" : "Ilan bulunamadi"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {id.startsWith("user-")
                ? "Yeni ilan tarayici hafizasindan okunuyor. Gorunmezse listeye donun."
                : "Bu ilana ait kayit bulunamadi."}
            </p>
            <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/listings">Ilanlara don</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const whatsappUrl = () => {
    const msg = `Merhaba Hajazna! ${listing.title} ilaniyla ilgileniyorum. Konum: ${
      listing.city
    } / ${listing.region}. Tarihler: ${checkIn || "[Giris]"} - ${checkOut || "[Cikis]"}.`;
    return `https://wa.me/963000000000?text=${encodeURIComponent(msg)}`;
  };

  const gallery = listing.gallery.length ? listing.gallery : [listing.image_url];
  const detailStats = [
    { icon: Home, label: "Ilan tipi", value: listing.property_type },
    { icon: Users, label: "Misafir", value: "6-10 kisi" },
    { icon: Ruler, label: "Alan", value: "Ozel villa" },
    { icon: BadgeCheck, label: "Durum", value: "Dogrulanmis ilan" },
  ];
  const amenities = [
    { ok: listing.amenities.has_solar_power, label: "Gunes enerjisi sistemi" },
    { ok: listing.amenities.is_conservative_private, label: "Aileye uygun / ozel alan" },
    { ok: true, label: "Mobilyali konaklama" },
    { ok: true, label: "Mutfak kullanimi" },
    { ok: true, label: "Otopark imkani" },
    { ok: true, label: "WhatsApp ile hizli iletisim" },
  ];
  const rules = [
    "Tarih ve musaitlik ev sahibiyle teyit edilir.",
    "Fiyat gecelik bazda gosterilir.",
    "Giris ve cikis saatleri rezervasyon oncesi netlestirilir.",
    "Ek hizmetler ve depozito varsa ev sahibi tarafindan bildirilir.",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <Link
            to="/listings"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Ilanlara don
          </Link>

          <section className="rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">{listing.property_type}</Badge>
                  <Badge variant="outline" className="gap-1 border-border/80 bg-background">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Dogrulanmis ilan
                  </Badge>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                  {listing.title}
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> {listing.city} / {listing.region}
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-extrabold text-primary">
                    ${listing.price_per_night} / gece
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-background">
                  <Heart className="h-4 w-4" /> Favori
                </Button>
                <Button variant="outline" size="sm" className="bg-background">
                  <Share2 className="h-4 w-4" /> Paylas
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-3 lg:grid-cols-[1fr_300px]">
            <div className="relative overflow-hidden rounded-lg border border-border/80 bg-muted shadow-[var(--shadow-card)]">
              <img
                src={gallery[activeImg] ?? listing.image_url}
                alt={listing.title}
                className="aspect-[16/10] w-full object-cover lg:aspect-[16/9]"
              />
              <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-card/95 px-3 py-2 text-xs font-extrabold text-foreground shadow-sm backdrop-blur">
                <Camera className="h-3.5 w-3.5 text-primary" /> {gallery.length} fotograf
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setActiveImg(index)}
                  className={`overflow-hidden rounded-lg border-2 bg-muted transition ${
                    activeImg === index ? "border-primary" : "border-transparent hover:border-primary/40"
                  }`}
                >
                  <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="min-w-0">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {detailStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-xs font-semibold text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-sm font-extrabold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-extrabold text-foreground">Ilan aciklamasi</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{listing.description}</p>
              </div>

              <div className="mt-5 rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-extrabold text-foreground">Ozellikler</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <li
                      key={amenity.label}
                      className={`flex items-center gap-2 text-sm ${
                        amenity.ok ? "text-foreground" : "text-muted-foreground line-through"
                      }`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {amenity.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                  <h2 className="text-xl font-extrabold text-foreground">Konum bilgisi</h2>
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {listing.city} / {listing.region}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Detayli adres ve ulasim bilgileri rezervasyon oncesi ev sahibi tarafindan
                    paylasilir.
                  </p>
                </div>

                <div className="rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                  <h2 className="text-xl font-extrabold text-foreground">Ev sahibi</h2>
                  <p className="mt-3 text-sm font-semibold text-foreground">Hajazna dogrulanmis ilan</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Sorulariniz ve rezervasyon talebiniz WhatsApp uzerinden ev sahibi ekibine iletilir.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-extrabold text-foreground">Rezervasyon notlari</h2>
                <ul className="mt-4 grid gap-3">
                  {rules.map((rule) => (
                    <li key={rule} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-elegant)] lg:sticky lg:top-36">
              <div className="rounded-lg bg-muted/70 p-4">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-foreground">${listing.price_per_night}</span>
                  <span className="pb-1 text-sm text-muted-foreground">/ gece</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tarihleri secip WhatsApp uzerinden musaitlik sorun.
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" /> Giris tarihi
                  </span>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    className="h-11 rounded-md bg-background"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" /> Cikis tarihi
                  </span>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="h-11 rounded-md bg-background"
                  />
                </label>
              </div>

              <Button asChild size="lg" className="mt-5 w-full bg-price text-primary-foreground hover:bg-price/90">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> WhatsApp ile sor
                </a>
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Rezervasyon onayi ve odeme detaylari ev sahibiyle gorusmede netlesir.
              </p>
              <AdSlot slotId="listing-sidebar" variant="compact" className="mt-5" />
            </aside>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
