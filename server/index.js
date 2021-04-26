require("dotenv").config();

const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
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
