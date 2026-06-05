import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowLeft, Camera, Check, Home, MapPin, MessageCircle } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
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
  component: ListingDetail,
});

function ListingDetail() {
  const { listing: staticListing, id } = Route.useLoaderData();
  const [userListings] = useUserListings();
  const listing = staticListing ?? userListings.find((item) => item.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-extrabold text-foreground">Ilan bulunamadi</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Bu ilana ait kayit bulunamadi veya tarayici hafizasindan okunamadi.
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

  const gallery = listing.gallery.length ? listing.gallery : [listing.image_url];
  const amenities = [
    { ok: listing.amenities.has_solar_power, label: "Gunes enerjisi" },
    { ok: listing.amenities.is_conservative_private, label: "Aileye uygun / ozel alan" },
  ].filter((item) => item.ok);
  const whatsappUrl = () => {
    const msg = `Merhaba Hajazna! ${listing.title} ilaniyla ilgileniyorum. Konum: ${listing.city} / ${listing.region}.`;
    return `https://wa.me/963000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
          <Link
            to="/listings"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Ilanlara don
          </Link>

          <section className="rounded-lg border border-border/80 bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
            <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {listing.title}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {listing.city} / {listing.region}
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-extrabold text-primary">
                ${listing.price_per_night} / gece
              </span>
            </p>
          </section>

          <section className="mt-4 overflow-hidden rounded-lg border border-border/80 bg-card shadow-[var(--shadow-card)]">
            <div className="relative bg-muted">
              <img
                src={gallery[activeImg] ?? listing.image_url}
                alt={listing.title}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
              />
              <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-card/95 px-3 py-2 text-xs font-extrabold text-foreground shadow-sm backdrop-blur">
                <Camera className="h-3.5 w-3.5 text-primary" /> {gallery.length} fotograf
              </span>
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImg(index)}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-md border-2 bg-muted transition ${
                      activeImg === index ? "border-primary" : "border-transparent hover:border-primary/40"
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <div className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-extrabold text-foreground">Aciklama</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{listing.description}</p>
              </div>

              <div className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-extrabold text-foreground">Bilgiler</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoRow icon={<Home className="h-4 w-4" />} label="Tip" value={listing.property_type} />
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label="Konum" value={`${listing.city} / ${listing.region}`} />
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-extrabold text-foreground">Ozellikler</h2>
                {amenities.length ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {amenities.map((amenity) => (
                      <li key={amenity.label} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {amenity.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Ek ozellikler ev sahibiyle gorusmede netlesir.
                  </p>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
              <div className="text-3xl font-extrabold text-foreground">${listing.price_per_night}</div>
              <p className="mt-1 text-sm text-muted-foreground">Gecelik fiyat</p>
              <Button asChild size="lg" className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> WhatsApp ile sor
                </a>
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Musaitlik ve odeme detaylari ev sahibiyle netlesir.
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

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-muted/70 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-extrabold text-foreground">{value}</p>
      </div>
    </div>
  );
}
