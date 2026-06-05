import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Sun, Shield, ArrowLeft, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { listings } from "@/data/listings";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }) => {
    const listing = listings.find((l) => l.id === params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.listing.title} — SuriStay` },
      { name: "description", content: loaderData.listing.description },
      { property: "og:title", content: loaderData.listing.title },
      { property: "og:description", content: loaderData.listing.description },
      { property: "og:image", content: loaderData.listing.image_url },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl">Listing not found</h1>
        <Link to="/listings" className="mt-4 inline-block text-primary hover:underline">Back to villas</Link>
      </div>
    </div>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const whatsappUrl = () => {
    const msg = `Hello SuriStay! I want to book ${listing.title} in ${listing.region} from ${checkIn || "[Check-In]"} to ${checkOut || "[Check-Out]"}.`;
    return `https://wa.me/963000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Link to="/listings" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All villas
          </Link>

          {/* Gallery */}
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="overflow-hidden rounded-2xl sm:col-span-3">
              <img src={listing.gallery[activeImg]} alt={listing.title} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="flex gap-3 sm:flex-col">
              {listing.gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`flex-1 overflow-hidden rounded-xl border-2 transition ${activeImg === i ? "border-primary" : "border-transparent"}`}>
                  <img src={g} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {listing.region}, {listing.city}
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{listing.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{listing.property_type}</Badge>
                {listing.amenities.has_solar_power && <Badge variant="outline" className="gap-1"><Sun className="h-3 w-3" />Solar Power</Badge>}
                {listing.amenities.is_conservative_private && <Badge variant="outline" className="gap-1"><Shield className="h-3 w-3" />Conservative / Private</Badge>}
              </div>
              <div className="mt-8 border-t border-border/60 pt-8">
                <h2 className="font-display text-2xl font-semibold">About this villa</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{listing.description}</p>
              </div>
              <div className="mt-8 border-t border-border/60 pt-8">
                <h2 className="font-display text-2xl font-semibold">Amenities & features</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { ok: listing.amenities.has_solar_power, l: "Solar power system" },
                    { ok: listing.amenities.is_conservative_private, l: "Fully private property" },
                    { ok: true, l: "Fully furnished" },
                    { ok: true, l: "WiFi included" },
                    { ok: true, l: "Kitchen access" },
                    { ok: true, l: "Parking on-site" },
                  ].map((a) => (
                    <li key={a.l} className={`flex items-center gap-2 text-sm ${a.ok ? "" : "text-muted-foreground line-through"}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {a.l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking */}
            <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-elegant)] lg:sticky lg:top-24">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">${listing.price_per_night}</span>
                <span className="text-sm text-muted-foreground">/ night</span>
              </div>
              <div className="mt-5 grid gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Check-in</label>
                  <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Check-out</label>
                  <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
              </div>
              <Button asChild size="lg" className="mt-5 w-full gap-2 rounded-xl bg-[oklch(0.62_0.16_155)] text-white hover:bg-[oklch(0.55_0.16_155)]">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Book via WhatsApp
                </a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">You'll be redirected to WhatsApp to complete your booking with our team.</p>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}