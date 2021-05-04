import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useInvoice } from "../../InvoiceContext";
import _ from "lodash";
import { format } from "date-fns";
import invoiceService from "../../services/invoices";

import useScreenWidth from "../custom-hooks/useScreenWidth";

import ItemList from "../ItemList/ItemList";

import { Button } from "../shared/Button.elements";
import {
  Container,
  GoBack,
  InvoiceActions,
  InvoiceInfo,
  StyledStatus
} from "./SingleInvoiceView.elements";
import { Status } from "../Invoice/Invoice.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircle } from "@fortawesome/free-solid-svg-icons";

export default function SingleInvoiceView() {
  const invoice = useInvoice();
  const [status, setStatus] = useState(invoice.status);
  const width = useScreenWidth();

  if (invoice === null) {
    return <Redirect to="/" />;
  }

  const toggleStatus = () => {
    setStatus(prevState => {
      if (prevState === "paid") {
        return "pending";
      }
      return "paid";
    });
    invoiceService.toggleStatus(invoice);
  };

  return (
    <>
      <GoBack>
        <div>
          <Link to="/">
            <FontAwesomeIcon icon={faChevronLeft} className="fa-chevron-left" />
            <span> Go Back</span>
          </Link>
        </div>
      </GoBack>
      <Container>
        {width >= 701 && (
          <InvoiceActions>
            <div>
              <span>Status</span>
              <StyledStatus status={status} className="status">
                <span>
                  <FontAwesomeIcon icon={faCircle} className="fa-circle" />
                  {_.capitalize(status)}
                </span>
              </StyledStatus>
            </div>
            <div>
              <Button color="white">Edit</Button>
              <Button color="red">Delete</Button>
              <Button onClick={() => toggleStatus()}>
                Mark as {status === "pending" ? "Paid" : "Pending"}
              </Button>
            </div>
          </InvoiceActions>
        )}
        {width < 701 && (
          <StyledStatus status={invoice.status} className="status">
            <span>
              <FontAwesomeIcon icon={faCircle} className="fa-circle" />
              {_.capitalize(invoice.status)}
            </span>
          </StyledStatus>
        )}
        <InvoiceInfo>
          <div>
            <div>
              <h2 className="invoice-id">
                <span>#</span>
                {invoice._id.toUpperCase()}
              </h2>
              <span>{invoice.description}</span>
            </div>
            <div className="sender-address">
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
                <h2>{format(new Date(invoice.createdAt), "L-d-yyyy")}</h2>
              </div>
              <div>
                <span>Payment Due</span>
                <h2>{format(new Date(invoice.paymentDue), "L-d-yyyy")}</h2>
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
            {width < 701 && <div className="break"></div>}
            <div className="client-email">
              <span>Sent to</span>
              <h2>{invoice.clientEmail}</h2>
            </div>
          </div>
          <ItemList items={invoice.items} total={invoice.total} />
        </InvoiceInfo>
      </Container>
      {width < 701 && (
        <InvoiceActions>
          <div>
            <Button color="white">Edit</Button>
            <Button color="red">Delete</Button>
            <Button onClick={() => toggleStatus()}>
              Mark as {status === "pending" ? "Paid" : "Pending"}
            </Button>
          </div>
        </InvoiceActions>
      )}
    </>
  );
}
