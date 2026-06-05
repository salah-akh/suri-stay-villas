const CATEGORY_TREE = [
  {
    key: "real_estate",
    label: "Real Estate",
    children: [
      {
        key: "short_term_rentals",
        label: "Short Term Rentals",
        children: [
          { key: "villas", label: "Villas" },
          { key: "bungalows", label: "Bungalows" },
          { key: "farmhouses", label: "Farmhouses (Mazraa)" },
          { key: "chalets", label: "Chalets" },
        ],
      },
    ],
  },
];

const VIEW_TYPES = ["Mountain", "Sea", "City", "Nature", "None"];
const POOL_STATUSES = ["No Pool", "Standard Pool", "Heated Pool", "Conservative Private"];
const HEATING_TYPES = ["Solar", "Diesel/Chofaj", "Electricity/AC", "Fireplace"];
const LANGUAGES = ["ar", "en"];

// Replace or hydrate this from a Governorate/District/Neighborhood collection later.
// Keep IDs stable; listings should store these IDs, not free-text addresses.
const LOCATION_TREE = [
  {
    id: "damascus",
    name: "Damascus",
    districts: [
      {
        id: "damascus-city",
        name: "Damascus City",
        neighborhoods: [
          { id: "mezzeh", name: "Mezzeh" },
          { id: "old-damascus", name: "Old Damascus" },
        ],
      },
    ],
  },
  {
    id: "aleppo",
    name: "Aleppo",
    districts: [
      {
        id: "aleppo-city",
        name: "Aleppo City",
        neighborhoods: [
          { id: "aziziyeh", name: "Aziziyeh" },
          { id: "jdaydeh", name: "Jdaydeh" },
        ],
      },
    ],
  },
  {
    id: "latakia",
    name: "Latakia",
    districts: [
      {
        id: "latakia-coast",
        name: "Latakia Coast",
        neighborhoods: [
          { id: "ras-al-bassit", name: "Ras al-Bassit" },
          { id: "slunfeh", name: "Slunfeh" },
        ],
      },
    ],
  },
];

function flattenNeighborhoods() {
  return LOCATION_TREE.flatMap((governorate) =>
    governorate.districts.flatMap((district) =>
      district.neighborhoods.map((neighborhood) => ({
        governorate_id: governorate.id,
        governorate_name: governorate.name,
        district_id: district.id,
        district_name: district.name,
        neighborhood_id: neighborhood.id,
        neighborhood_name: neighborhood.name,
      })),
    ),
  );
}

function isValidLocationSelection(location) {
  return flattenNeighborhoods().some(
    (item) =>
      item.governorate_id === location?.governorate_id &&
      item.district_id === location?.district_id &&
      item.neighborhood_id === location?.neighborhood_id,
  );
}

module.exports = {
  CATEGORY_TREE,
  HEATING_TYPES,
  LANGUAGES,
  LOCATION_TREE,
  POOL_STATUSES,
  VIEW_TYPES,
  flattenNeighborhoods,
  isValidLocationSelection,
};
