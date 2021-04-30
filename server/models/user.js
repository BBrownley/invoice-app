const mongoose = require("mongoose");

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
  }
})

const User = mongoose.model("user", userSchema);

module.exports = User;