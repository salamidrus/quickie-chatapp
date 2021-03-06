const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Conversation
const ConversationSchema = new Schema(
  {
    recipients: [{ type: Schema.Types.ObjectId, ref: "users" }],
    lastMessage: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = Conversation = mongoose.model(
  "conversations",
  ConversationSchema
);
