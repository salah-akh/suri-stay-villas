const express = require("express");
const Listing = require("../models/Listing");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

function buildListingFilters(query) {
  const filters = { is_active: true };

  if (query.category_key) filters.category_key = query.category_key;
  if (query.governorate_id) filters["location.governorate_id"] = query.governorate_id;
  if (query.district_id) filters["location.district_id"] = query.district_id;
  if (query.neighborhood_id) filters["location.neighborhood_id"] = query.neighborhood_id;
  if (query.view_type) filters.view_type = query.view_type;
  if (query.pool_status) filters.pool_status = query.pool_status;
  if (query.heating_type) filters.heating_type = query.heating_type;

  if (query.q) {
    filters.$text = { $search: query.q };
  }

  return filters;
}

function toDetailContract(listing) {
  return {
    id: listing._id,
    host_id: listing.host_id,
    category_key: listing.category_key,
    media_canvas: listing.media,
    location_label: [
      listing.location.governorate_name,
      listing.location.district_name,
      listing.location.neighborhood_name,
    ].join(" / "),
    tabs: {
      technical_details: {
        price_per_night: listing.price_per_night,
        area_gross: listing.area_gross,
        area_net: listing.area_net,
        guest_capacity: listing.guest_capacity,
        view_type: listing.view_type,
        pool_status: listing.pool_status,
        heating_type: listing.heating_type,
      },
      rich_description: {
        title: listing.title,
        description: listing.description,
      },
      map_coordinates: {
        latitude: listing.location.latitude,
        longitude: listing.location.longitude,
      },
    },
    cta: {
      add_to_favorites_endpoint: "/api/favorites/toggle",
      initiate_chat_endpoint: "/api/messages",
    },
  };
}

// PUBLIC: guests may browse the feed.
router.get("/", async (req, res, next) => {
  try {
    const filters = buildListingFilters(req.query);
    const sort =
      req.query.sort === "price_asc"
        ? { price_per_night: 1 }
        : req.query.sort === "price_desc"
          ? { price_per_night: -1 }
          : { is_featured: -1, createdAt: -1 };

    const [listings, featured] = await Promise.all([
      Listing.find(filters).sort(sort).limit(60).lean(),
      Listing.find({ is_active: true, is_featured: true }).sort({ createdAt: -1 }).limit(12).lean(),
    ]);

    return res.json({ listings, featured });
  } catch (error) {
    return next(error);
  }
});

// PUBLIC: guests may view listing detail.
router.get("/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id, is_active: true }).lean();

    if (!listing) return res.status(404).json({ error: "LISTING_NOT_FOUND" });

    return res.json(toDetailContract(listing));
  } catch (error) {
    return next(error);
  }
});

// PROTECTED: only authenticated hosts can create listings.
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      host_id: req.user._id,
      is_featured: false,
      is_active: true,
    });

    return res.status(201).json(toDetailContract(listing));
  } catch (error) {
    return next(error);
  }
});

// PROTECTED: only the listing host can update their listing.
router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, host_id: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!listing) return res.status(404).json({ error: "LISTING_NOT_FOUND_OR_FORBIDDEN" });

    return res.json(toDetailContract(listing));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
