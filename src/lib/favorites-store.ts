import { useEffect, useState } from "react";

const FAVORITES_STORAGE_KEY = "hajazna:favorite-listings";
const FAVORITES_CHANGED_EVENT = "hajazna:favorite-listings-changed";

function normalizeIds(value: unknown) {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter((item): item is string => typeof item === "string" && !!item.trim())))
    : [];
}

export function readFavoriteIds() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!raw) return [];

  try {
    return normalizeIds(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeFavoriteIds(ids: string[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalizeIds(ids)));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

export function useFavoriteIds() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(readFavoriteIds());
    const syncStorage = (event: StorageEvent) => {
      if (!event.key || event.key === FAVORITES_STORAGE_KEY) syncFavorites();
    };

    syncFavorites();
    window.addEventListener("storage", syncStorage);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    };
  }, []);

  const toggleFavorite = (listingId: string) => {
    const currentIds = readFavoriteIds();
    const nextIds = currentIds.includes(listingId)
      ? currentIds.filter((id) => id !== listingId)
      : [listingId, ...currentIds];

    writeFavoriteIds(nextIds);
    setFavoriteIds(nextIds);
  };

  const isFavorite = (listingId: string) => favoriteIds.includes(listingId);

  return { favoriteIds, isFavorite, toggleFavorite };
}
