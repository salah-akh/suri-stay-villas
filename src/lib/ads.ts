import { useEffect, useState } from "react";

export const AD_STORAGE_KEY = "hajazna:ad-settings";
export const AD_SETTINGS_CHANGED_EVENT = "hajazna:ad-settings-changed";

export const adSlots = [
  {
    id: "top",
    name: "Ust reklam bandi",
    description: "Tum sayfalarda navigasyonun en ustunde gorunur.",
  },
  {
    id: "home-inline",
    name: "Ana sayfa reklam alani",
    description: "Arama bolumunden sonra, one cikan villalardan once gorunur.",
  },
  {
    id: "listings-inline",
    name: "Listeleme reklam alani",
    description: "Villa sonuclari listesinde filtrelerin altinda gorunur.",
  },
  {
    id: "listing-sidebar",
    name: "Villa detay reklam alani",
    description: "Villa detay sayfasinda rezervasyon panelinin altinda gorunur.",
  },
] as const;

export type AdSlotId = (typeof adSlots)[number]["id"];

export type AdSlotConfig = {
  enabled: boolean;
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export type AdSettings = {
  enabled: boolean;
  slots: Record<AdSlotId, AdSlotConfig>;
};

type StoredAdSlot = Partial<Record<keyof AdSlotConfig, unknown>>;
type StoredAdSettings = {
  enabled?: unknown;
  slots?: Partial<Record<AdSlotId, StoredAdSlot>>;
};

export const defaultAdSettings: AdSettings = {
  enabled: true,
  slots: {
    top: {
      enabled: true,
      eyebrow: "Sponsorlu",
      headline: "Erken rezervasyon firsati",
      body: "Sezon baslamadan secili villalarda ozel fiyatlari yakalayin.",
      ctaLabel: "Detaylar",
      ctaHref: "/contact",
      imageUrl: "",
    },
    "home-inline": {
      enabled: true,
      eyebrow: "Reklam",
      headline: "Villanizi Hajazna'da one cikarin",
      body: "Daha fazla misafire ulasmak icin ozel vitrin alanlarimizi kullanin.",
      ctaLabel: "Reklam ver",
      ctaHref: "/contact",
      imageUrl: "",
    },
    "listings-inline": {
      enabled: true,
      eyebrow: "Sponsorlu",
      headline: "Haftanin ozel konaklama firsatlari",
      body: "Aileler icin uygun, dogrulanmis ve hizli destekli villalari kesfedin.",
      ctaLabel: "Iletisime gec",
      ctaHref: "/contact",
      imageUrl: "",
    },
    "listing-sidebar": {
      enabled: true,
      eyebrow: "Onerilen",
      headline: "Transfer ve yerel destek",
      body: "Konaklamaniz icin ulasim, karsilama ve planlama destegi alin.",
      ctaLabel: "Sor",
      ctaHref: "/contact",
      imageUrl: "",
    },
  },
};

function cloneSettings(settings: AdSettings): AdSettings {
  return {
    enabled: settings.enabled,
    slots: Object.fromEntries(
      adSlots.map((slot) => [slot.id, { ...settings.slots[slot.id] }]),
    ) as Record<AdSlotId, AdSlotConfig>,
  };
}

function textOrDefault(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export function normalizeAdSettings(value?: StoredAdSettings | null): AdSettings {
  const settings = cloneSettings(defaultAdSettings);

  if (typeof value?.enabled === "boolean") {
    settings.enabled = value.enabled;
  }

  for (const slot of adSlots) {
    const storedSlot = value?.slots?.[slot.id];
    const fallback = settings.slots[slot.id];

    if (!storedSlot) continue;

    settings.slots[slot.id] = {
      enabled:
        typeof storedSlot.enabled === "boolean" ? storedSlot.enabled : fallback.enabled,
      eyebrow: textOrDefault(storedSlot.eyebrow, fallback.eyebrow),
      headline: textOrDefault(storedSlot.headline, fallback.headline),
      body: textOrDefault(storedSlot.body, fallback.body),
      ctaLabel: textOrDefault(storedSlot.ctaLabel, fallback.ctaLabel),
      ctaHref: textOrDefault(storedSlot.ctaHref, fallback.ctaHref),
      imageUrl: textOrDefault(storedSlot.imageUrl, fallback.imageUrl),
    };
  }

  return settings;
}

export function readAdSettings(): AdSettings {
  if (typeof window === "undefined") return cloneSettings(defaultAdSettings);

  const raw = window.localStorage.getItem(AD_STORAGE_KEY);
  if (!raw) return cloneSettings(defaultAdSettings);

  try {
    return normalizeAdSettings(JSON.parse(raw) as StoredAdSettings);
  } catch {
    return cloneSettings(defaultAdSettings);
  }
}

export function writeAdSettings(settings: AdSettings) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(AD_STORAGE_KEY, JSON.stringify(normalizeAdSettings(settings)));
  window.setTimeout(() => {
    window.dispatchEvent(new Event(AD_SETTINGS_CHANGED_EVENT));
  }, 0);
}

type AdSettingsUpdater = AdSettings | ((current: AdSettings) => AdSettings);

export function useAdSettings() {
  const [settings, setSettingsState] = useState<AdSettings>(() =>
    cloneSettings(defaultAdSettings),
  );

  useEffect(() => {
    const syncSettings = () => setSettingsState(readAdSettings());
    const syncStorage = (event: StorageEvent) => {
      if (!event.key || event.key === AD_STORAGE_KEY) syncSettings();
    };

    syncSettings();
    window.addEventListener("storage", syncStorage);
    window.addEventListener(AD_SETTINGS_CHANGED_EVENT, syncSettings);

    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(AD_SETTINGS_CHANGED_EVENT, syncSettings);
    };
  }, []);

  const setSettings = (updater: AdSettingsUpdater) => {
    setSettingsState((current) => {
      const next = normalizeAdSettings(
        typeof updater === "function" ? updater(current) : updater,
      );
      writeAdSettings(next);
      return next;
    });
  };

  return [settings, setSettings] as const;
}
