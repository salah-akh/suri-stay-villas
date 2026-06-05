const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true, index: true },
  },
  { timestamps: true },
);

favoriteSchema.index({ user_id: 1, listing_id: 1 }, { unique: true });

module.exports = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
