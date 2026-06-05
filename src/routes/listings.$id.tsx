import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Shield, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { listings } from "@/data/listings";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }) => {
    const listing = listings.find((item) => item.id === params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
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
        <h1 className="text-3xl font-extrabold text-foreground">Listing not found</h1>
        <Link to="/listings" className="mt-4 inline-block text-primary hover:underline">
          Back to villas
        </Link>
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
    const msg = `Hello Hajazna! I want to book ${listing.title} in ${listing.region} from ${
      checkIn || "[Check-In]"
    } to ${checkOut || "[Check-Out]"}.`;
    return `https://wa.me/963000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <Link
            to="/listings"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All villas
          </Link>

          <section className="grid gap-3 lg:grid-cols-[1fr_280px]">
            <div className="relative overflow-hidden rounded-lg bg-muted shadow-[var(--shadow-card)]">
              <img
                src={listing.gallery[activeImg]}
                alt={listing.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/80 to-transparent p-5 text-white">
                <p className="flex items-center gap-2 text-sm font-semibold text-white/85">
                  <MapPin className="h-4 w-4" /> {listing.region}, {listing.city}
                </p>
                <h1 className="mt-2 max-w-3xl text-2xl font-extrabold sm:text-4xl">{listing.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {listing.gallery.map((image, index) => (
                <button
                  key={image}
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
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary text-primary-foreground">{listing.property_type}</Badge>
                {listing.amenities.has_solar_power && (
                  <Badge variant="outline" className="gap-1 border-border/80 bg-card">
                    <Sun className="h-3.5 w-3.5 text-primary" /> Solar power
                  </Badge>
                )}
                {listing.amenities.is_conservative_private && (
                  <Badge variant="outline" className="gap-1 border-border/80 bg-card">
                    <Shield className="h-3.5 w-3.5 text-primary" /> Private
                  </Badge>
                )}
              </div>

              <div className="mt-8 rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-extrabold text-foreground">About this villa</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{listing.description}</p>
              </div>

              <div className="mt-5 rounded-lg border border-border/80 bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-extrabold text-foreground">Amenities and features</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { ok: listing.amenities.has_solar_power, label: "Solar power system" },
                    { ok: listing.amenities.is_conservative_private, label: "Fully private property" },
                    { ok: true, label: "Fully furnished" },
                    { ok: true, label: "WiFi included" },
                    { ok: true, label: "Kitchen access" },
                    { ok: true, label: "Parking on-site" },
                  ].map((amenity) => (
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
            </div>

            <aside className="h-fit rounded-lg border border-border/80 bg-card p-5 shadow-[var(--shadow-elegant)] lg:sticky lg:top-24">
              <div className="rounded-lg bg-muted/70 p-4">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-foreground">${listing.price_per_night}</span>
                  <span className="pb-1 text-sm text-muted-foreground">/ night</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Confirm dates with the Hajazna team.</p>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" /> Check-in
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
                    <CalendarDays className="h-4 w-4 text-primary" /> Check-out
                  </span>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="h-11 rounded-md bg-background"
                  />
                </label>
              </div>

              <Button asChild size="lg" className="mt-5 w-full bg-price text-white hover:bg-price/90">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Book via WhatsApp
                </a>
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                You will be redirected to WhatsApp to finish the booking with our team.
              </p>
            </aside>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
