import React, { useState } from "react";
import Invoice from "../Invoice/Invoice";
import imgEmpty from "../../assets/illustration-empty.svg";

import { useDarkMode } from "../../darkModeContext";

import { Container, EmptyWarning, EmptyImg } from "./InvoicesList.elements";

export default function InvoicesList({ invoices }) {
  const darkMode = useDarkMode();
  console.log(invoices);

  return (
    <Container>
      {invoices.length === 0 && (
        <EmptyWarning darkMode={darkMode}>
          <EmptyImg></EmptyImg>
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the <strong>New Invoice</strong>{" "}
            button and get started. Alternatively, toggle the various status
            filters to view invoices that were filtered out.
          </p>
        </EmptyWarning>
      )}
      {invoices.map((invoice, key) => {
        return <Invoice invoice={invoice} key={key} />;
      })}
    </Container>
  );
}
