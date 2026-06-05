import { Link } from "@tanstack/react-router";
import { BadgeCheck, Camera, Heart, MapPin, Shield, Sun } from "lucide-react";
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
        <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-[11px] font-extrabold text-primary-foreground shadow-sm">
          Vitrin
        </span>
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-secondary/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <Camera className="h-3 w-3" /> {listing.gallery.length}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase text-primary">{listing.property_type}</p>
            <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-snug text-foreground transition group-hover:text-link">
              {listing.title}
            </h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background text-muted-foreground transition group-hover:border-primary/30 group-hover:text-primary">
            <Heart className="h-4 w-4" />
          </span>
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

      <div className="flex items-end justify-between border-t border-border/70 pt-3 sm:w-32 sm:flex-col sm:border-t-0 sm:pt-0">
        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-extrabold text-primary">
          <BadgeCheck className="h-3.5 w-3.5" /> Dogrulandi
        </span>
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
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-secondary/80 to-transparent" />
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground shadow-sm">
            Vitrin
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-secondary shadow-sm">
            <Heart className="h-4 w-4" />
          </span>
        </div>
        <span className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-secondary shadow-sm">
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
          <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-extrabold text-primary">
            Dogrulandi
          </span>
        </div>
      </div>
    </Link>
  );
}
