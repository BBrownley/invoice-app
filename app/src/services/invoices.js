import axios from "axios";
const baseUrl = process.env.baseURL || "http://localhost:5000";

const getInvoices = async () => {
  const res = await axios.get(`${baseUrl}/invoices`);
  return res.data;
};

const add = async invoice => {
  try {
    const res = await axios.post(`${baseUrl}/invoices`, { invoice });
    const newInvoice = res.data;
    return newInvoice;
  } catch (exception) {
    console.log(exception.message);
  }
};

const invoiceService = {
  getInvoices,
  add
};

export default invoiceService;

// Frontend form validation
// NewInvoiceForm refactoring (helper functions for submit/validation)
// Invoice draft backend logic
// Close new invoice form when submitting form
// Design app landing page (based off logo/branding icon)