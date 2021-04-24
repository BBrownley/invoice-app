import axios from "axios";

const getInvoices = async () => {
  const res = await axios.get("http://localhost:3001/invoices");
  return res.data;
};

const add = async invoice => {
  const res = await axios.post("http://localhost:3001/invoices", invoice);
};

const invoiceService = {
  getInvoices,
  add
};

export default invoiceService;
