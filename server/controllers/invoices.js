const express = require("express");
const app = express();
const invoiceRouter = express.Router();
const Invoice = require("../models/Invoice");

invoiceRouter.get("/", async (req, res) => {
  const invoices = await Invoice.find({});
  console.log(invoices);
  res.status(200).json(invoices);
});

module.exports = invoiceRouter;
