import { Link } from "@tanstack/react-router";
import { Camera, MapPin, Shield, Sun } from "lucide-react";
import type { Listing } from "@/data/listings";

export function PropertyRow({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group grid gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-soft)] sm:grid-cols-[220px_1fr_auto]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted sm:aspect-auto sm:h-36">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-card/95 px-2 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
          <Camera className="h-3 w-3" /> {listing.gallery.length}
        </span>
      </div>

      <div className="min-w-0">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase text-primary">{listing.property_type}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-snug text-foreground transition group-hover:text-link">
            {listing.title}
          </h3>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {listing.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 font-semibold text-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {listing.city} / {listing.region}
          </span>
          {listing.amenities.has_solar_power && (
            <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
              <Sun className="h-3.5 w-3.5 text-primary" /> Gunes enerjisi
            </span>
          )}
          {listing.amenities.is_conservative_private && (
            <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
              <Shield className="h-3.5 w-3.5 text-primary" /> Ozel
            </span>
          )}
        </div>
      </div>

      <div className="flex items-end justify-end border-t border-border/70 pt-3 sm:w-32 sm:flex-col sm:border-t-0 sm:pt-0">
        <div className="text-right">
          <div className="text-2xl font-extrabold text-price">
            ${listing.price_per_night.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">gece</div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/80 bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/45 to-transparent" />
        <span className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-md bg-card/95 px-2.5 py-1 text-xs font-bold text-foreground shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {listing.city} / {listing.region}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-extrabold uppercase text-primary">
            {listing.property_type}
          </p>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Camera className="h-3.5 w-3.5" /> {listing.gallery.length}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 min-h-11 text-base font-extrabold leading-snug text-foreground transition group-hover:text-link">
          {listing.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {listing.amenities.has_solar_power && (
            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
              Solar
            </span>
          )}
          {listing.amenities.is_conservative_private && (
            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
              Ozel
            </span>
          )}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-border/70 pt-4">
          <div>
            <span className="text-2xl font-extrabold text-price">${listing.price_per_night}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ gece</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
