import { Link } from "@tanstack/react-router";
import { MapPin, Sun, Shield } from "lucide-react";
import type { Listing } from "@/data/listings";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image_url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1 text-sm font-semibold text-foreground shadow-sm">
          ${listing.price_per_night}<span className="text-xs text-muted-foreground"> / night</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {listing.region}, {listing.city}
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground transition-colors group-hover:text-primary">
          {listing.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <Badge variant="secondary" className="font-normal">{listing.property_type}</Badge>
          {listing.amenities.has_solar_power && (
            <Badge variant="outline" className="gap-1 font-normal"><Sun className="h-3 w-3" />Solar</Badge>
          )}
          {listing.amenities.is_conservative_private && (
            <Badge variant="outline" className="gap-1 font-normal"><Shield className="h-3 w-3" />Private</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}