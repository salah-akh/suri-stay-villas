const express = require("express");
const Listing = require("../models/Listing");
const User = require("../models/User");
const { LANGUAGES } = require("../constants/classifieds");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/listings", isAuthenticated, async (req, res, next) => {
  try {
    const listings = await Listing.find({ host_id: req.user._id }).sort({ createdAt: -1 }).lean();
    return res.json({ listings });
  } catch (error) {
    return next(error);
  }
});

router.patch("/me", isAuthenticated, async (req, res, next) => {
  try {
    const allowed = {};

    if (typeof req.body.name === "string") allowed.name = req.body.name.trim();
    if (typeof req.body.phone === "string") allowed.phone = req.body.phone.trim();
    if (LANGUAGES.includes(req.body.language)) allowed.language = req.body.language;

    const user = await User.findByIdAndUpdate(req.user._id, { $set: allowed }, { new: true })
      .select("_id name email phone language")
      .lean();

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
