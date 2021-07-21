import { add, format } from "date-fns";

const validateInvoice = invoice => {
  if (invoice.status === "pending" || invoice.status === "paid") {
    // Check that all fields are filled in
    for (const [key, value] of Object.entries(invoice)) {
      if (key === "items") {
        if (value.length === 0) {
          throw new Error("Must have at least one item");
        } else {
          // Make sure all items have a name
          value.forEach(item => {
            if (item.name.trim().length === 0) {
              throw new Error("All items must have a name");
            }
          });
        }
      } else if (key === "clientAddress" || key === "senderAddress") {
        const addressValid = Object.values(value).every(
          field => field.trim().length !== 0
        );

        if (!addressValid) {
          throw new Error("Please fill out all fields");
        }
      } else if (typeof value === "string" && value.trim().length === 0) {
        throw new Error("Please fill out all fields");
      }
    }
  } else if (invoice.status !== "draft") {
    throw new Error(
      "Submitted invoices must be either pending, paid, or draft"
    );
  }
  return invoice;
};

// Takes all the form values from the invoice form and formats it into a single object
const formatInvoice = (formValues, items, status) => {
  const {
    createdAt,
    description,
    paymentTerms,
    clientName,
    clientEmail
  } = formValues;
  const paymentDue = add(new Date(createdAt), { days: paymentTerms.value });
  const senderAddress = {
    street: formValues.fromStreet,
    city: formValues.fromCity,
    postCode: formValues.fromPostCode,
    country: formValues.fromCountry
  };
  const clientAddress = {
    street: formValues.clientStreet,
    city: formValues.clientCity,
    postCode: formValues.clientPostCode,
    country: formValues.clientCountry
  };
  const total = items.reduce((acc, item) => {
    return acc + item.total;
  }, 0);

  const newInvoice = {
    items,
    total,
    senderAddress,
    createdAt: format(createdAt, "L-d-yyyy"),
    paymentDue: format(paymentDue, "L-d-yyyy"),
    description,
    clientName,
    clientEmail,
    status,
    paymentTerms: paymentTerms.value,
    clientAddress
  };

  return newInvoice;
};

const helpers = { validateInvoice, formatInvoice };

export default helpers;
