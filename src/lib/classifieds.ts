export const defaultCategoryPath = ["Emlak", "Konut", "Gunluk Kiralik", "Villa"] as const;

export const listingCategories = [
  {
    id: "daily-villa",
    title: "Gunluk Kiralik Villa",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Villa"],
    type: "Villa",
  },
  {
    id: "summer-house",
    title: "Yazlik",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Yazlik"],
    type: "Yazlik",
  },
  {
    id: "beach-villa",
    title: "Denize Yakin Villa",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Denize Yakin Villa"],
    type: "Beach Villa",
  },
  {
    id: "private-villa",
    title: "Muhafazakar Villa",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Muhafazakar Villa"],
    type: "Ozel Villa",
  },
  {
    id: "mountain-house",
    title: "Dag Evi",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Dag Evi"],
    type: "Mountain Chalet",
  },
  {
    id: "bungalow",
    title: "Bungalov",
    path: ["Emlak", "Konut", "Gunluk Kiralik", "Bungalov"],
    type: "Bungalov",
  },
] as const;

export const roomOptions = ["1+1", "2+1", "3+1", "4+1", "5+1", "6+2"] as const;
export const advertiserTypes = ["Ev sahibinden", "Emlak Ofisinden", "Turizm Acentesinden"] as const;

const fallbackAreas = [85, 105, 120, 140, 160, 190, 220, 260] as const;
const fallbackDates = ["Bugun", "Dun", "2 gun once", "3 gun once", "1 hafta once"] as const;

export function formatCategoryPath(path?: readonly string[]) {
  return path?.length ? path.join(" / ") : defaultCategoryPath.join(" / ");
}

export function listingNoFromId(id: string) {
  const digits = id.replace(/\D/g, "").slice(-6).padStart(6, "0");
  return `HZ-${digits}`;
}

function indexFromId(id: string, length: number) {
  const numeric = Number(id.replace(/\D/g, "")) || 1;
  return Math.abs(numeric - 1) % length;
}

export function defaultAreaFromId(id: string) {
  return fallbackAreas[indexFromId(id, fallbackAreas.length)] ?? fallbackAreas[0];
}

export function defaultRoomFromId(id: string) {
  return roomOptions[indexFromId(id, roomOptions.length)] ?? roomOptions[0];
}

export function defaultDateFromId(id: string) {
  return fallbackDates[indexFromId(id, fallbackDates.length)] ?? fallbackDates[0];
}
