const express = require("express");
const Favorite = require("../models/Favorite");
const Listing = require("../models/Listing");
const User = require("../models/User");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/toggle", isAuthenticated, async (req, res, next) => {
  try {
    const { listing_id } = req.body;
    const listing = await Listing.findOne({ _id: listing_id, is_active: true }).select("_id");

    if (!listing) return res.status(404).json({ error: "LISTING_NOT_FOUND" });

    const existing = await Favorite.findOne({ user_id: req.user._id, listing_id });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      await User.updateOne({ _id: req.user._id }, { $pull: { favorite_listing_ids: listing_id } });
      return res.json({ favorited: false, listing_id });
    }

    await Favorite.create({ user_id: req.user._id, listing_id });
    await User.updateOne({ _id: req.user._id }, { $addToSet: { favorite_listing_ids: listing_id } });

    return res.status(201).json({ favorited: true, listing_id });
  } catch (error) {
    return next(error);
  }
});

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user_id: req.user._id })
      .populate("listing_id")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ listings: favorites.map((item) => item.listing_id).filter(Boolean) });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
