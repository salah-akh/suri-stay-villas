export type Listing = {
  id: string;
  title: string;
  description: string;
  property_type: string;
  city: string;
  region: string;
  price_per_night: number;
  image_url: string;
  gallery: string[];
  amenities: {
    has_solar_power: boolean;
    is_conservative_private: boolean;
  };
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const listings: Listing[] = [
  {
    id: "1",
    title: "Damascene Heritage Villa",
    description: "A restored Ottoman-era courtyard villa in the heart of Old Damascus, featuring intricate mosaics, a citrus garden, and a central marble fountain.",
    property_type: "Heritage Villa",
    city: "Damascus",
    region: "Old City",
    price_per_night: 180,
    image_url: img("photo-1564013799919-ab600027ffc6"),
    gallery: [img("photo-1564013799919-ab600027ffc6"), img("photo-1600585154340-be6161a56a0c"), img("photo-1600566753190-17f0baa2a6c3")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
  {
    id: "2",
    title: "Latakia Seaside Retreat",
    description: "Beachfront villa with panoramic Mediterranean views, private pool, and direct sand access. Perfect for family getaways.",
    property_type: "Beach Villa",
    city: "Latakia",
    region: "Ras al-Bassit",
    price_per_night: 240,
    image_url: img("photo-1613490493576-7fde63acd811"),
    gallery: [img("photo-1613490493576-7fde63acd811"), img("photo-1582268611958-ebfd161ef9cf"), img("photo-1600210492486-724fe5c67fb0")],
    amenities: { has_solar_power: true, is_conservative_private: false },
  },
  {
    id: "3",
    title: "Aleppo Stone Mansion",
    description: "Historic stone mansion in the Christian quarter, featuring vaulted ceilings, hand-carved details, and a private rooftop terrace.",
    property_type: "Historic Mansion",
    city: "Aleppo",
    region: "Jdeydeh",
    price_per_night: 160,
    image_url: img("photo-1518883956601-3c3ca1bbcef5"),
    gallery: [img("photo-1518883956601-3c3ca1bbcef5"), img("photo-1600596542815-ffad4c1539a9"), img("photo-1600607687939-ce8a6c25118c")],
    amenities: { has_solar_power: false, is_conservative_private: true },
  },
  {
    id: "4",
    title: "Bloudan Mountain Chalet",
    description: "Alpine-style chalet in the cool mountains overlooking the Barada valley, with fireplace, garden, and panoramic balconies.",
    property_type: "Mountain Chalet",
    city: "Bloudan",
    region: "Rif Dimashq",
    price_per_night: 140,
    image_url: img("photo-1542718610-a1d656d1884c"),
    gallery: [img("photo-1542718610-a1d656d1884c"), img("photo-1551524559-8af4e6624178"), img("photo-1469796466635-455ede028aca")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
  {
    id: "5",
    title: "Tartus Coastal Villa",
    description: "Modern coastal villa with infinity pool, sea-facing terrace, and minimalist interiors. Walking distance to the marina.",
    property_type: "Modern Villa",
    city: "Tartus",
    region: "Coastal",
    price_per_night: 210,
    image_url: img("photo-1512917774080-9991f1c4c750"),
    gallery: [img("photo-1512917774080-9991f1c4c750"), img("photo-1600585154526-990dced4db0d"), img("photo-1600566753376-12c8ab7fb75b")],
    amenities: { has_solar_power: true, is_conservative_private: false },
  },
  {
    id: "6",
    title: "Homs Family Estate",
    description: "Spacious family estate with large garden, traditional Syrian kitchen, and outdoor majlis. Ideal for gatherings.",
    property_type: "Family Estate",
    city: "Homs",
    region: "Al-Waer",
    price_per_night: 120,
    image_url: img("photo-1600596542815-ffad4c1539a9"),
    gallery: [img("photo-1600596542815-ffad4c1539a9"), img("photo-1600210491892-03d54c0aaf87"), img("photo-1600607687939-ce8a6c25118c")],
    amenities: { has_solar_power: false, is_conservative_private: true },
  },
  {
    id: "7",
    title: "Kassab Forest Lodge",
    description: "Secluded wooden lodge nestled in the pine forests of Kassab, with mountain views, fireplace, and serene hiking trails nearby.",
    property_type: "Forest Lodge",
    city: "Kassab",
    region: "Latakia Highlands",
    price_per_night: 130,
    image_url: img("photo-1449158743715-0a90ebb6d2d8"),
    gallery: [img("photo-1449158743715-0a90ebb6d2d8"), img("photo-1518780664697-55e3ad937233"), img("photo-1542314831-068cd1dbfeeb")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
  {
    id: "8",
    title: "Palmyra Desert Retreat",
    description: "Boutique desert villa with traditional clay architecture, stargazing terrace, and access to the legendary ruins.",
    property_type: "Desert Villa",
    city: "Palmyra",
    region: "Tadmur",
    price_per_night: 190,
    image_url: img("photo-1539635278303-d4002c07eae3"),
    gallery: [img("photo-1539635278303-d4002c07eae3"), img("photo-1559717865-a99cac1c95d8"), img("photo-1505881502353-a1986add3762")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
  {
    id: "9",
    title: "Damascus Garden Suite",
    description: "Private suite with garden and pool in the upscale Mezzeh neighborhood. Modern interior with classical Syrian touches.",
    property_type: "Garden Villa",
    city: "Damascus",
    region: "Mezzeh",
    price_per_night: 170,
    image_url: img("photo-1600585154340-be6161a56a0c"),
    gallery: [img("photo-1600585154340-be6161a56a0c"), img("photo-1600566753190-17f0baa2a6c3"), img("photo-1600210492486-724fe5c67fb0")],
    amenities: { has_solar_power: true, is_conservative_private: false },
  },
  {
    id: "10",
    title: "Slunfeh Pine Villa",
    description: "Mountain villa above 1300m surrounded by pine trees, cool summers, and breathtaking valley views.",
    property_type: "Mountain Villa",
    city: "Slunfeh",
    region: "Latakia Mountains",
    price_per_night: 150,
    image_url: img("photo-1502602898657-3e91760cbb34"),
    gallery: [img("photo-1502602898657-3e91760cbb34"), img("photo-1518780664697-55e3ad937233"), img("photo-1542314831-068cd1dbfeeb")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
  {
    id: "11",
    title: "Aleppo Modern Loft",
    description: "Contemporary loft in the rebuilt city center, with rooftop pool and sweeping skyline views.",
    property_type: "Modern Loft",
    city: "Aleppo",
    region: "Aziziyeh",
    price_per_night: 135,
    image_url: img("photo-1560448204-e02f11c3d0e2"),
    gallery: [img("photo-1560448204-e02f11c3d0e2"), img("photo-1600607687939-ce8a6c25118c"), img("photo-1600585154526-990dced4db0d")],
    amenities: { has_solar_power: true, is_conservative_private: false },
  },
  {
    id: "12",
    title: "Maaloula Cliffside Villa",
    description: "Unique villa carved into the cliffs of historic Maaloula, blending ancient Aramaic heritage with modern comfort.",
    property_type: "Cliffside Villa",
    city: "Maaloula",
    region: "Qalamoun",
    price_per_night: 165,
    image_url: img("photo-1505873242700-f289a29e1e0f"),
    gallery: [img("photo-1505873242700-f289a29e1e0f"), img("photo-1564501049412-61c2a3083791"), img("photo-1600596542815-ffad4c1539a9")],
    amenities: { has_solar_power: true, is_conservative_private: true },
  },
];

export const cities = Array.from(new Set(listings.map((l) => l.city))).sort();
export const propertyTypes = Array.from(new Set(listings.map((l) => l.property_type))).sort();