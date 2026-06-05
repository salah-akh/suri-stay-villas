import { Link } from "@tanstack/react-router";
import { Heart, ImageIcon, MapPin, Shield, Sun } from "lucide-react";
import type { Listing } from "@/data/listings";

export function PropertyRow({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] sm:gap-4"
    >
      <div className="relative h-28 w-32 flex-shrink-0 overflow-hidden rounded-md bg-muted sm:h-32 sm:w-48">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-secondary/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <ImageIcon className="h-3 w-3" /> {listing.gallery.length}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-bold text-foreground transition group-hover:text-link sm:text-base">
            {listing.title}
          </h3>
          <span className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition group-hover:border-primary/30 group-hover:text-primary sm:flex">
            <Heart className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-1 line-clamp-2 hidden max-w-2xl text-sm leading-6 text-muted-foreground sm:block">
          {listing.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{listing.property_type}</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {listing.city} / {listing.region}
          </span>
          {listing.amenities.has_solar_power && (
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Sun className="h-3.5 w-3.5" /> Solar
            </span>
          )}
          {listing.amenities.is_conservative_private && (
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Shield className="h-3.5 w-3.5" /> Private
            </span>
          )}
        </div>
      </div>

      <div className="flex w-20 flex-shrink-0 flex-col items-end justify-end text-right sm:w-28">
        <div className="text-lg font-extrabold text-price sm:text-2xl">
          ${listing.price_per_night.toLocaleString()}
        </div>
        <div className="text-[11px] text-muted-foreground">per night</div>
      </div>
    </Link>
  );
}

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/80 bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-secondary/80 to-transparent" />
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-secondary shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {listing.city}
        </span>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-secondary shadow-sm">
          <Heart className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-primary">{listing.property_type}</p>
        <h3 className="mt-1 line-clamp-2 min-h-11 text-base font-bold leading-snug text-foreground transition group-hover:text-link">
          {listing.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{listing.region}</p>
        <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-3">
          <div>
            <span className="text-xl font-extrabold text-price">${listing.price_per_night}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ night</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <ImageIcon className="h-3.5 w-3.5" /> {listing.gallery.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
