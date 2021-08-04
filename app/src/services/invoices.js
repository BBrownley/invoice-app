import axios from "axios";
import storedToken from "./tokenUtil";
import dotenv from "dotenv";

dotenv.config({ path: "../../../config.env" });

//const baseUrl = process.env.BASE_URL || "http://localhost:5000";
const baseUrl = "https://pure-castle-11971.herokuapp.com/";

const getInvoices = async () => {
  const res = await axios.get(`${baseUrl}/invoices`);
  return res.data;
};

const getGuestInvoices = async () => {
  const res = await axios.get(`${baseUrl}/invoices/guest`);
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

const setStatus = async (invoice, newStatus) => {
  try {
    const body = {
      ownerId: invoice.ownerId,
      newStatus
    };

    await axios.put(
      `${baseUrl}/invoices/${invoice._id}/status?setstatus=${newStatus}`,
      body
    );
  } catch (exception) {
    console.log(exception.message);
  }
};

const toggleStatus = async invoice => {
  try {
    const body = {
      ownerId: invoice.ownerId,
      prevStatus: invoice.status
    };

    await axios.put(`${baseUrl}/invoices/${invoice._id}/status`, body);
  } catch (exception) {
    console.log(exception.message);
  }
};

const deleteInvoice = async invoice => {
  try {
    await axios.delete(`${baseUrl}/invoices/${invoice._id}`);
  } catch (exception) {
    console.log(exception.message);
  }
};

const updateInvoice = async invoice => {
  try {
    const res = await axios.put(
      `${baseUrl}/invoices/${invoice._id}?draft=${invoice.status === "draft"}`,
      invoice
    );
    return res.data;
  } catch (exception) {
    console.log(exception.message);
  }
};

const invoiceService = {
  getInvoices,
  getGuestInvoices,
  add,
  setStatus,
  toggleStatus,
  updateInvoice,
  deleteInvoice
};

export default invoiceService;
