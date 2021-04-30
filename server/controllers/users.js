const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register a new user
userRouter.post("/", async (req, res, next) => {
  const { newUsername, newEmail, newPassword, pwConfirm } = req.body;

  // All fields must be filled
  if (
    newUsername.trim().length === 0 ||
    newEmail.trim().length === 0 ||
    newPassword.trim().length === 0 ||
    pwConfirm.trim().length === 0
  ) {
    return next(new Error("All fields must be filled"));
  }

  // Passwords must match
  if (newPassword !== pwConfirm) {
    return next(new Error("Passwords do not match"));
  }

  // email must be valid
  const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValid = newEmail.match(mailformat);

  if (!emailValid) {
    return next(new Error("Invalid email"));
  }

  try {
    const generatedSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, generatedSalt);

    const newUser = await User.create({
      username: newUsername,
      email: newEmail,
      hashedPassword: hashedPassword
    });

  } catch (exception) {
    return next(new Error(exception));
  }
  next();
});

module.exports = userRouter;
