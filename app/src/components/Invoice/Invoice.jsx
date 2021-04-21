import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import _ from "lodash";

import { useInvoiceUpdate } from "../../InvoiceContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  InvoiceId,
  PaymentDue,
  Name,
  Total,
  Status
} from "./Invoice.elements";

export default function Invoice({ invoice }) {
  const selectInvoice = useInvoiceUpdate();

  return (
    <Container>
      <InvoiceId>
        <span className="gray-500">#</span>
        {invoice.id}
      </InvoiceId>
      <PaymentDue>
        Due {format(new Date(invoice.paymentDue), "LLL d yyyy")}
      </PaymentDue>
      <Name>{invoice.clientName}</Name>
      <Total>$ {invoice.total.toFixed(2)}</Total>
      <Status status={invoice.status}>
        <span>
          <FontAwesomeIcon icon={faCircle} className="fa-circle" />
          {_.capitalize(invoice.status)}
        </span>
      </Status>
      <Link
        to={`/invoices/${invoice.id}`}
        onClick={() => selectInvoice(invoice)}
      >
        <FontAwesomeIcon icon={faChevronRight} className="fa-chevron-right" />
      </Link>
    </Container>
  );
}
