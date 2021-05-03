const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = mongoose.Schema({
  id: String,
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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

module.exports = Invoice;
