import { useEffect, useMemo, useState } from "react";
import { listings as defaultListings, type Listing } from "@/data/listings";
import {
  advertiserTypes,
  defaultAreaFromId,
  defaultCategoryPath,
  defaultDateFromId,
  defaultRoomFromId,
  listingNoFromId,
} from "@/lib/classifieds";

const USER_LISTINGS_STORAGE_KEY = "hajazna:user-listings";
const USER_LISTINGS_CHANGED_EVENT = "hajazna:user-listings-changed";

const fallbackImage =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80";

export type ListingDraft = {
  categoryPath: string[];
  title: string;
  description: string;
  propertyType: string;
  city: string;
  region: string;
  pricePerNight: number;
  areaM2: number;
  roomCount: string;
  advertiserType: string;
  contactName: string;
  contactPhone: string;
  imageUrl: string;
  hasSolarPower: boolean;
  isConservativePrivate: boolean;
};

type StoredListing = Partial<Record<keyof Listing, unknown>> & {
  amenities?: Partial<Record<keyof Listing["amenities"], unknown>>;
};

function textOrDefault(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function numberOrDefault(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

function arrayTextOrDefault(value: unknown, fallback: readonly string[]) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && !!item.trim())
    : [...fallback];
}

function normalizeListing(value: StoredListing): Listing {
  const imageUrl = textOrDefault(value.image_url, fallbackImage);
  const gallery = Array.isArray(value.gallery)
    ? value.gallery.filter((item): item is string => typeof item === "string" && !!item.trim())
    : [];
  const id = textOrDefault(value.id, `user-${Date.now()}`);

  return {
    id,
    category_path: arrayTextOrDefault(value.category_path, defaultCategoryPath),
    listing_no: textOrDefault(value.listing_no, listingNoFromId(id)),
    title: textOrDefault(value.title, "Yeni villa ilani"),
    description: textOrDefault(value.description, "Ev sahibi tarafindan eklenen yeni ilan."),
    property_type: textOrDefault(value.property_type, "Villa"),
    city: textOrDefault(value.city, "Damascus"),
    region: textOrDefault(value.region, "Merkez"),
    price_per_night: numberOrDefault(value.price_per_night, 100),
    area_m2: numberOrDefault(value.area_m2, defaultAreaFromId(id)),
    room_count: textOrDefault(value.room_count, defaultRoomFromId(id)),
    advertiser_type: textOrDefault(value.advertiser_type, advertiserTypes[0]),
    contact_name: textOrDefault(value.contact_name, "Ev sahibi"),
    contact_phone: textOrDefault(value.contact_phone, "+963 11 000 0000"),
    published_at: textOrDefault(value.published_at, defaultDateFromId(id)),
    image_url: imageUrl,
    gallery: gallery.length ? gallery : [imageUrl],
    amenities: {
      has_solar_power: value.amenities?.has_solar_power === true,
      is_conservative_private: value.amenities?.is_conservative_private === true,
    },
  };
}

export function createListingFromDraft(draft: ListingDraft): Listing {
  const imageUrl = draft.imageUrl.trim() || fallbackImage;
  const id = `user-${Date.now()}`;

  return {
    id,
    category_path: draft.categoryPath.length ? draft.categoryPath : [...defaultCategoryPath],
    listing_no: listingNoFromId(id),
    title: draft.title.trim(),
    description: draft.description.trim(),
    property_type: draft.propertyType.trim(),
    city: draft.city.trim(),
    region: draft.region.trim(),
    price_per_night: draft.pricePerNight,
    area_m2: draft.areaM2,
    room_count: draft.roomCount,
    advertiser_type: draft.advertiserType,
    contact_name: draft.contactName.trim() || "Ev sahibi",
    contact_phone: draft.contactPhone.trim() || "+963 11 000 0000",
    published_at: new Date().toISOString().slice(0, 10),
    image_url: imageUrl,
    gallery: [imageUrl],
    amenities: {
      has_solar_power: draft.hasSolarPower,
      is_conservative_private: draft.isConservativePrivate,
    },
  };
}

export function readUserListings(): Listing[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(USER_LISTINGS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((item) => normalizeListing(item)) : [];
  } catch {
    return [];
  }
}

export function writeUserListings(nextListings: Listing[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(USER_LISTINGS_STORAGE_KEY, JSON.stringify(nextListings));
  window.dispatchEvent(new Event(USER_LISTINGS_CHANGED_EVENT));
}

export function useUserListings() {
  const [userListings, setUserListings] = useState<Listing[]>([]);

  useEffect(() => {
    const syncListings = () => setUserListings(readUserListings());
    const syncStorage = (event: StorageEvent) => {
      if (!event.key || event.key === USER_LISTINGS_STORAGE_KEY) syncListings();
    };

    syncListings();
    window.addEventListener("storage", syncStorage);
    window.addEventListener(USER_LISTINGS_CHANGED_EVENT, syncListings);

    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(USER_LISTINGS_CHANGED_EVENT, syncListings);
    };
  }, []);

  const addUserListing = (listing: Listing) => {
    const nextListings = [listing, ...readUserListings()];
    writeUserListings(nextListings);
    setUserListings(nextListings);
  };

  return [userListings, addUserListing] as const;
}

export function useListingsCatalog() {
  const [userListings, addUserListing] = useUserListings();

  const allListings = useMemo(
    () => [...userListings, ...defaultListings],
    [userListings],
  );
  const cities = useMemo(
    () => Array.from(new Set(allListings.map((listing) => listing.city))).sort(),
    [allListings],
  );
  const propertyTypes = useMemo(
    () => Array.from(new Set(allListings.map((listing) => listing.property_type))).sort(),
    [allListings],
  );

  return { listings: allListings, cities, propertyTypes, addUserListing };
}
