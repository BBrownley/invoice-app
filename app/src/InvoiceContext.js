import React, { useContext, useState } from "react";

const InvoiceContext = React.createContext();
const InvoiceUpdateContext = React.createContext();

export const useInvoice = () => {
  return useContext(InvoiceContext);
};

export const useInvoiceUpdate = () => {
  return useContext(InvoiceUpdateContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(null);

  const handleSetInvoice = invoice => {
    setInvoice(invoice);
  };

  return (
    <InvoiceContext.Provider value={invoice}>
      <InvoiceUpdateContext.Provider value={handleSetInvoice}>
        {children}
      </InvoiceUpdateContext.Provider>
    </InvoiceContext.Provider>
  );
};
