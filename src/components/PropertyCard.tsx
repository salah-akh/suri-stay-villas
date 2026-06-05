import { Link } from "@tanstack/react-router";
import { Sun, Shield, Heart, ImageIcon } from "lucide-react";
import type { Listing } from "@/data/listings";

/** Dense row-style listing, sahibinden inspired. */
export function PropertyRow({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex gap-3 border-b border-border bg-card px-3 py-3 transition-colors hover:bg-muted/60 sm:gap-4 sm:px-4"
    >
      <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-sm bg-muted sm:h-28 sm:w-44">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-sm bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          <ImageIcon className="h-2.5 w-2.5" /> {listing.gallery.length}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-link sm:text-[15px]">
          {listing.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 hidden text-xs text-muted-foreground sm:block">
          {listing.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[11px] text-muted-foreground sm:text-xs">
          <span className="font-medium text-foreground">{listing.property_type}</span>
          <span className="h-3 w-px bg-border" />
          <span>{listing.city} / {listing.region}</span>
          {listing.amenities.has_solar_power && (
            <span className="hidden items-center gap-0.5 sm:inline-flex"><Sun className="h-3 w-3" /> Solar</span>
          )}
          {listing.amenities.is_conservative_private && (
            <span className="hidden items-center gap-0.5 sm:inline-flex"><Shield className="h-3 w-3" /> Private</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between text-right">
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="text-muted-foreground hover:text-price"
          aria-label="Save"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div>
          <div className="text-base font-extrabold text-price sm:text-lg">
            ${listing.price_per_night.toLocaleString()}
          </div>
          <div className="text-[10px] text-muted-foreground">per night</div>
        </div>
      </div>
    </Link>
  );
}

/** Compact card variant for the home page grid. */
export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 left-2 rounded-sm bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {listing.gallery.length} photos
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-link">
          {listing.title}
        </h3>
        <p className="text-[11px] text-muted-foreground">{listing.city} / {listing.region}</p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-base font-extrabold text-price">${listing.price_per_night}</span>
          <span className="text-[10px] text-muted-foreground">/ night</span>
        </div>
      </div>
    </Link>
  );
}