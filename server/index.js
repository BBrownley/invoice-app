const http = require("http");
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const connection = require("./db/connection");
// const Invoice = require("./models/Invoice");
const cors = require("cors");

const invoiceRouter = require("./controllers/invoices");

// app.use("invoices", invoiceRouter);

const invoiceSchema = mongoose.Schema({
  id: String,
  createdAt: Date,
  paymentDue: Date,
  description: String,
  paymentTerms: Number,
  clientName: String,
  clientEmail: String,
  status: String,
  senderAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String
  },
  clientAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String
  },
  items: [],
  total: Number
});

const Invoice = mongoose.model("invoice", invoiceSchema);

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

app.use(cors());
app.use(express.json());

app.get("/invoices", async (req, res) => {
  const invoices = await Invoice.find({});
  console.log(invoices);
  res.status(200).json(invoices);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  console.log(connection);
});
