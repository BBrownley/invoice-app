const express = require("express");
const jwt = require("jsonwebtoken");
const invoiceRouter = express.Router();
const Invoice = require("../models/Invoice");

// Get all invoices
invoiceRouter.get("/", async (req, res) => {
  const invoices = await Invoice.find({});
  res.status(200).json(invoices);
});

// Add a new invoice
invoiceRouter.post("/", async (req, res, next) => {
  const invoice = req.body.invoice;
  const token = req.token;

  // Check if new invoice is draft or pending

  if (invoice.status === "draft") {
  } else if (invoice.status === "pending") {
    // Check that all fields are filled in
    for (const [key, value] of Object.entries(invoice)) {
      if (key === "items") {
        if (value.length === 0) {
          return next(new Error("No items"));
        } else {
          // Make sure all items have a name
          let hasUnnamedItem = false;
          value.forEach(item => {
            if (item.name.trim().length === 0) {
              hasUnnamedItem = true;
            }
          });
          if (hasUnnamedItem) {
            return next(new Error("Please name all items"));
          }
        }
      } else if (key === "clientAddress" || key === "senderAddress") {
        const addressValid = Object.values(value).every(
          field => field.trim().length !== 0
        );

        if (!addressValid) {
          return next(new Error("Fill out all fields"));
        }
      } else if (typeof value === "string" && value.trim().length === 0) {
        return next(new Error("Fill out all fields"));
      }
    }

    // Validation passes, create new invoice in DB if there's a user

    if (!req.isGuest) {
      try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);

        const newInvoice = await Invoice.create({
          ...invoice,
          ownerId: decodedToken._id
        });
        res.status(200).json(newInvoice);
      } catch (exception) {
        return next(new Error("Unable to authorize user"));
      }
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

module.exports = invoiceRouter;
