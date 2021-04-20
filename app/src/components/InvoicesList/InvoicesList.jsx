import React from "react";
import Invoice from "../Invoice/Invoice";

import { Container } from "./InvoicesList.elements";

export default function InvoicesList({ invoices }) {
  return (
    <Container>
      {invoices.map((invoice, key) => {
        return <Invoice invoice={invoice} key={key} />;
      })}
    </Container>
  );
}
