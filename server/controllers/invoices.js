const express = require("express");
const app = express();
const invoiceRouter = express.Router();
const Invoice = require("../models/Invoice");

invoiceRouter.get("/", async (req, res) => {
  const invoices = await Invoice.find({});
  console.log(invoices);
  res.status(200).json(invoices);
});

invoiceRouter.post("/", async (req, res) => {
  const invoice = req.body.invoice;

  // Check if new invoice is draft or pending

  if (invoice.status === "draft") {
  } else if (invoice.status === "pending") {
    // Check that all fields are filled in
    for (const [key, value] of Object.entries(invoice)) {
      console.log(key);
      console.log(value);

      if (key === "items" && value.length === 0) {
        console.log("Error: No items");
      }

      if (key === clientAddress || key === senderAddress) {
        Object.values(value).forEach(value => {
          if (value.trim().length === 0) {
            console.log("Error: Fill out all forms")
          }
        })
      }
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

module.exports = invoiceRouter;
