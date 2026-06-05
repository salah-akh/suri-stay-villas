const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true, index: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    message_text: { type: String, required: true, trim: true, maxlength: 4000 },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false },
);

messageSchema.index({ room_id: 1, timestamp: 1 });

module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);
