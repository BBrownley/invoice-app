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
    // Username must not be in use
    User.findOne({ username: newUsername }, (err, user) => {
      if (user !== null) {
        return next(new Error("Username already in use"));
      }
    });

    // Email must not be in use
    User.findOne({ email: newEmail }, (err, user) => {
      if (user !== null) {
        return next(new Error("Email already in use"));
      }
    });

    const generatedSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, generatedSalt);

    await User.create({
      username: newUsername,
      email: newEmail,
      hashedPassword: hashedPassword
    });

    res.status(200);
  } catch (exception) {
    return next(new Error(exception));
  }
  next();
});

// Login
userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (username.trim().length === 0 || password.trim().length === 0) {
    return next(new Error("All fields must be filled"));
  }

  try {
    // Verify user
    const user = await User.findOne({ username });
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
      throw new Error();
    }

    // Username/pw correct, sign token
    const userToken = jwt.sign(JSON.stringify(user), process.env.SECRET);
    res.json(`Bearer ${userToken}`);
  } catch (exception) {
    return next(new Error("Incorrect password"));
  }
});

module.exports = userRouter;
