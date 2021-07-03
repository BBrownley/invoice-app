const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  hashedPassword: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
  darkMode: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
