const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
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