import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useInvoice } from "../../InvoiceContext";
import _ from "lodash";

import { Button } from "../shared/Button.elements";
import {
  Container,
  InvoiceActions,
  InvoiceInfo
} from "./SingleInvoiceView.elements";
import { Status } from "../Invoice/Invoice.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircle } from "@fortawesome/free-solid-svg-icons";

export default function SingleInvoiceView() {
  const invoice = useInvoice();
  console.log(invoice);

  if (invoice === null) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <div>
        <Link to="/">
          <FontAwesomeIcon icon={faChevronLeft} className="fa-chevron-left" />
          <span> Go Back</span>
        </Link>
      </div>
      <InvoiceActions>
        <div>
          <span>Status</span>
          <Status status={invoice.status} className="status">
            <span>
              <FontAwesomeIcon icon={faCircle} className="fa-circle" />
              {_.capitalize(invoice.status)}
            </span>
          </Status>
        </div>
        <div>
          <Button color="white">Edit</Button>
          <Button color="red">Delete</Button>
          <Button>Mark as Paid</Button>
        </div>
      </InvoiceActions>
      <InvoiceInfo>
        <div>
          <div>
            <h2 className="invoice-id">
              <span>#</span>
              {invoice.id}
            </h2>
            <span>{invoice.description}</span>
          </div>
          <div>
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>
        <div>
          <div>
            <div>
              <span>Invoice Date</span>
              <h2>{invoice.createdAt}</h2>
            </div>
            <div>
              <span>Payment Due</span>
              <h2>{invoice.paymentDue}</h2>
            </div>
          </div>
          <div>
            <span>Bill To</span>
            <h2>{invoice.clientName}</h2>
            <span>{invoice.clientAddress.street}</span>
            <span>{invoice.clientAddress.city}</span>
            <span>{invoice.clientAddress.postCode}</span>
            <span>{invoice.clientAddress.country}</span>
          </div>
          <div>
            <span>Sent to</span>
            <h2>{invoice.clientEmail}</h2>
          </div>
        </div>
      </InvoiceInfo>
    </Container>
  );
}
