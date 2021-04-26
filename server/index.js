require("dotenv").config();

const http = require("http");
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

app.use(cors());
app.use(express.json());

const invoiceRouter = require("./controllers/invoices");

app.use("/invoices", invoiceRouter);

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

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  console.log(connection);
});

module.exports = app;
