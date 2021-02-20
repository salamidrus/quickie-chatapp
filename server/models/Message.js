const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("messages", messageSchema);
