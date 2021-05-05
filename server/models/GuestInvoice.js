const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestInvoiceSchema = mongoose.Schema({
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

const GuestInvoice = mongoose.model("guest-invoice", guestInvoiceSchema, "guest-invoices");

module.exports = GuestInvoice;
