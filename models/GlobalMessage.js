const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Users
const GlobalMessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = GlobalMessage = mongoose.model(
  "global_messages",
  GlobalMessageSchema
);
