import axios from "axios";

const getInvoices = async () => {
  const res = await axios.get("http://localhost:3001/invoices");
  return res.data;
};

const invoiceService = {
  getInvoices
}

export default invoiceService;