const mongoose = require("mongoose");
const {
  HEATING_TYPES,
  POOL_STATUSES,
  VIEW_TYPES,
  isValidLocationSelection,
} = require("../constants/classifieds");

const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const locationSchema = new mongoose.Schema(
  {
    governorate_id: { type: String, required: true, trim: true },
    governorate_name: { type: String, required: true, trim: true },
    district_id: { type: String, required: true, trim: true },
    district_name: { type: String, required: true, trim: true },
    neighborhood_id: { type: String, required: true, trim: true },
    neighborhood_name: { type: String, required: true, trim: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false },
);

const listingSchema = new mongoose.Schema(
  {
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category_key: {
      type: String,
      enum: ["villas", "bungalows", "farmhouses", "chalets"],
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, minlength: 8, maxlength: 180 },
    description: { type: String, required: true, trim: true, minlength: 20, maxlength: 8000 },
    price_per_night: { type: Number, required: true, min: 1, index: true },
    area_gross: { type: Number, required: true, min: 1 },
    area_net: { type: Number, required: true, min: 1 },
    guest_capacity: { type: Number, required: true, min: 1 },
    view_type: { type: String, enum: VIEW_TYPES, required: true, index: true },
    pool_status: { type: String, enum: POOL_STATUSES, required: true, index: true },
    heating_type: { type: String, enum: HEATING_TYPES, required: true, index: true },
    location: {
      type: locationSchema,
      required: true,
      validate: {
        validator: isValidLocationSelection,
        message: "Invalid cascading location. Use GET /api/meta/locations payload.",
      },
    },
    media: {
      type: [mediaSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "At least one image or video URL is required.",
      },
    },
    is_featured: { type: Boolean, default: false, index: true },
    is_active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

listingSchema.index({ title: "text", description: "text" });
listingSchema.index({
  category_key: 1,
  "location.governorate_id": 1,
  "location.district_id": 1,
  "location.neighborhood_id": 1,
  price_per_night: 1,
});

listingSchema.pre("validate", function validateNetArea(next) {
  if (this.area_net > this.area_gross) {
    return next(new Error("area_net cannot be greater than area_gross."));
  }
  return next();
});

module.exports = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
