const express = require("express");
const jwt = require("jsonwebtoken");
const invoiceRouter = express.Router();
const Invoice = require("../models/Invoice");
const GuestInvoice = require("../models/GuestInvoice");
const validateInvoice = require("../helpers/validateInvoice");

// Get invoices by user
invoiceRouter.get("/", async (req, res, next) => {
  if (req.isGuest) {
    return next(); // Their invoices are in localStorage
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const invoices = await Invoice.find({ ownerId: decodedToken._id }).exec();
  res.status(200).json(invoices);
});

// Get guest starter invoices for first-time users who do not want to make an account
invoiceRouter.get("/guest", async (req, res, next) => {
  // Confirm guest user
  if (!req.isGuest) {
    return next(new Error("Expected guest user to get guest starter invoices"));
  }
  const guestInvoices = await GuestInvoice.find({}).exec();
  res.json(guestInvoices);
});

// Add a new invoice
invoiceRouter.post("/", async (req, res, next) => {
  const invoice = req.body.invoice;

  // Newly created invoices must either be a draft or pending
  if (invoice.status !== "draft" && invoice.status !== "pending") {
    res.status(400).json({ message: "Bad request" });
  }

  if (invoice.status === "pending") {
    // Check that all fields are filled in unless it's a draft
    validateInvoice(invoice, next);
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
});

// Toggle or set invoice status

invoiceRouter.put("/:id/status", async (req, res, next) => {
  let newStatus;

  if (req.query.setstatus) {
    newStatus = req.query.setstatus;
  } else {
    // Toggle
    newStatus = req.body.prevStatus === "pending" ? "paid" : "pending";
  }

  // Verify user
  if (req.decodedToken._id !== req.body.ownerId) {
    return next(new Error("Invoice does not belong to this user"));
  }

  Invoice.findByIdAndUpdate(
    req.params.id,
    { status: newStatus },
    (err, result) => {
      if (err) {
        return next(new Error("Unable to update invoice status"));
      }
    }
  );

  next();
});

// Update entire invoice

invoiceRouter.put("/:id", async (req, res, next) => {
  if (req.isGuest) return next(); // Guest invoices remain on client

  // Verify user
  if (req.decodedToken._id !== req.body.ownerId) {
    return next(new Error("Invoice does not belong to this user"));
  }

  // Check that all fields are filled in if not draft
  if (req.query.draft == "false") {
    validateInvoice(req.body, next);
  }

  Invoice.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, results) => {
      if (err) {
        console.log(err.message);
        return next(new Error("Unable to update invoice"));
      } else {
        if (req.query.draft == "false") return next();

        // If invoice status was prev draft and all fields are now filled in, make it pending
        if (validateInvoice(req.body, next)) {
          res.status(200).json({ makePending: true });
        }
      }
    }
  );
});

// Delete invoice

invoiceRouter.delete("/:id", async (req, res, next) => {
  Invoice.findByIdAndDelete(req.params.id, (err, results) => {
    if (err) {
      return next(new Error("Unable to delete invoice"));
    }
  });
  next();
});

module.exports = invoiceRouter;
