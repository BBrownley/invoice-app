require("dotenv").config();

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

let PORT;

if (process.env.NODE_ENV === "test") {
  PORT = process.env.TEST_POST;
} else {
  PORT = process.env.PORT || 5000;
}

const uri =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const connection = require("./db/connection");
const cors = require("cors");
const tokenExtractor = require("./middleware/tokenExtractor");

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

const invoiceRouter = require("./controllers/invoices");
const userRouter = require("./controllers/users");
const errorHandler = require("./utils/errorHandler");

// app.get("/", (req, res) => {
//   res.send("Api running");
// });

app.use("/invoices", invoiceRouter);
app.use("/users", userRouter);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("error connecting to MongoDB: ", err.message);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  console.log(connection);
});

app.use(errorHandler);

module.exports = app;
