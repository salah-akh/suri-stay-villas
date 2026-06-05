const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const Listing = require("../models/Listing");
const Message = require("../models/Message");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

async function getOrCreateRoom({ guest_id, listing_id }) {
  const listing = await Listing.findOne({ _id: listing_id, is_active: true }).select("host_id title media");

  if (!listing) {
    const error = new Error("LISTING_NOT_FOUND");
    error.status = 404;
    throw error;
  }

  if (String(listing.host_id) === String(guest_id)) {
    const error = new Error("HOST_CANNOT_MESSAGE_OWN_LISTING");
    error.status = 400;
    throw error;
  }

  const room = await ChatRoom.findOneAndUpdate(
    { guest_id, host_id: listing.host_id, listing_id },
    { $set: { updated_at: new Date() } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return room;
}

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { listing_id, message_text } = req.body;

    if (!message_text || !String(message_text).trim()) {
      return res.status(400).json({ error: "MESSAGE_TEXT_REQUIRED" });
    }

    const room = await getOrCreateRoom({ guest_id: req.user._id, listing_id });
    const message = await Message.create({
      room_id: room._id,
      sender_id: req.user._id,
      message_text,
    });

    await ChatRoom.updateOne({ _id: room._id }, { $set: { updated_at: new Date() } });

    return res.status(201).json({ room, message });
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.message });
    return next(error);
  }
});

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const [received, sent] = await Promise.all([
      ChatRoom.find({ host_id: req.user._id })
        .populate("guest_id", "name email")
        .populate("listing_id", "title media price_per_night")
        .sort({ updated_at: -1 })
        .lean(),
      ChatRoom.find({ guest_id: req.user._id })
        .populate("host_id", "name email")
        .populate("listing_id", "title media price_per_night")
        .sort({ updated_at: -1 })
        .lean(),
    ]);

    return res.json({
      messages_received: received,
      messages_sent: sent,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:room_id", isAuthenticated, async (req, res, next) => {
  try {
    const room = await ChatRoom.findOne({
      _id: req.params.room_id,
      $or: [{ guest_id: req.user._id }, { host_id: req.user._id }],
    }).lean();

    if (!room) return res.status(404).json({ error: "ROOM_NOT_FOUND" });

    const messages = await Message.find({ room_id: room._id }).sort({ timestamp: 1 }).lean();

    return res.json({ room, messages });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
