import axios from "axios";
const baseUrl = process.env.baseURL || "http://localhost:5000";

const getInvoices = async () => {
  const res = await axios.get(`${baseUrl}/invoices`);
  return res.data;
};

const add = async invoice => {
  const res = await axios.post(baseUrl, invoice);
};

const invoiceService = {
  getInvoices,
  add
};

export default invoiceService;
