const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// Create Schema for Users
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    set: (encrypt = (val) => bcrypt.hashSync(val, SALT_ROUNDS)),
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
