const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    guest_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true, index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

chatRoomSchema.index({ guest_id: 1, host_id: 1, listing_id: 1 }, { unique: true });

module.exports = mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);
