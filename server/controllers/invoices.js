const express = require("express");
const app = express();
const invoiceRouter = express.Router();
const Invoice = require("../models/Invoice");

invoiceRouter.get("/", async (req, res) => {
  const invoices = await Invoice.find({});
  console.log(invoices);
  res.status(200).json(invoices);
});

invoiceRouter.post("/", async (req, res, next) => {
  const invoice = req.body.invoice;

  // Check if new invoice is draft or pending

  if (invoice.status === "draft") {
  } else if (invoice.status === "pending") {
    // Check that all fields are filled in
    for (const [key, value] of Object.entries(invoice)) {
      if (key === "items") {
        if (value.length === 0) {
          const error = new Error("Error: No items");

          throw new Error("No items");
        } else {
          // Make sure all items have a name
          value.forEach(item => {
            if (item.name.trim().length === 0) {
              const error = new Error("Please name all items");
              throw new Error("Please name all items");
            }
          });
        }
      } else if (key === "clientAddress" || key === "senderAddress") {
        Object.values(value).forEach(value => {
          if (value.trim().length === 0) {
            const error = new Error("Error: Fill out all fields");
            throw new Error("Fill out all fields");
          }
        });
      } else if (typeof value === "string" && value.trim().length === 0) {
        const error = new Error("Error: Fill out all fields");
        throw new Error("Fill out all fields");
      }
    }

    res.status(200).json(invoice);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

module.exports = invoiceRouter;
