import React, { useState, useEffect } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import Modal from "react-modal";

import { useInvoice, useInvoiceUpdate } from "../../InvoiceContext";
import { useDarkMode } from "../../darkModeContext";

import _ from "lodash";
import { format } from "date-fns";
import invoiceService from "../../services/invoices";

import useScreenWidth from "../custom-hooks/useScreenWidth";

import Sidebar from "../Sidebar/Sidebar";
import NewInvoiceForm from "../NewInvoiceForm/NewInvoiceForm";
import ItemList from "../ItemList/ItemList";

import { Button } from "../shared/Button.elements";
import {
  Container,
  GoBack,
  InvoiceActions,
  InvoiceInfo,
  StyledStatus,
  StyledModal
} from "./SingleInvoiceView.elements";
import { Status } from "../Invoice/Invoice.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircle } from "@fortawesome/free-solid-svg-icons";

export default function SingleInvoiceView() {
  let invoice = useInvoice();
  const updateInvoice = useInvoiceUpdate();
  const darkMode = useDarkMode();

  if (!invoice) {
    invoice = JSON.parse(window.localStorage.getItem("currentInvoice"));
  }

  const width = useScreenWidth();
  const history = useHistory();

  // Save current invoice to local storage so it persists between refreshes
  useState(() => {
    window.localStorage.setItem("currentInvoice", JSON.stringify(invoice));
  }, [invoice]);

  const [status, setStatus] = useState(invoice.status);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editInvoiceOpen, setEditInvoiceOpen] = useState(false);

  if (invoice === null) {
    return <Redirect to="/invoices" />;
  }

  const toggleStatus = () => {
    // Toggle invoice status between paid/pending
    setStatus(prevState => {
      const updatedStatus = prevState === "paid" ? "pending" : "paid";
      const updatedInvoice = { ...invoice, status: updatedStatus };

      // Update context with the new status and store it in localStorage
      updateInvoice(updatedInvoice);
      window.localStorage.setItem(
        "currentInvoice",
        JSON.stringify(updatedInvoice)
      );

      return updatedStatus;
    });

    if (localStorage.getItem("loggedUser")) {
      invoiceService.toggleStatus(invoice);
    } else {
      const currentInvoiceId = invoice._id;
      const updatedGuestInvoices = JSON.parse(
        localStorage.getItem("guestInvoices")
      ).map(invoice => {
        if (invoice._id === currentInvoiceId) {
          if (invoice.status === "pending") {
            return { ...invoice, status: "paid" };
          } else {
            return { ...invoice, status: "pending" };
          }
        }
        return invoice;
      });

      localStorage.setItem(
        "guestInvoices",
        JSON.stringify(updatedGuestInvoices)
      );
    }
  };

  const deleteInvoice = async () => {
    if (localStorage.getItem("loggedUser")) {
      await invoiceService.deleteInvoice(invoice);
      history.push("/invoices");
    } else {
      const guestInvoices = JSON.parse(localStorage.getItem("guestInvoices"));

      const updatedGuestInvoices = guestInvoices.filter(guestInvoice => {
        return guestInvoice._id !== invoice._id;
      });

      localStorage.setItem(
        "guestInvoices",
        JSON.stringify(updatedGuestInvoices)
      );
      history.push("/invoices");
    }
  };

  return (
    <>
      <Sidebar />
      <StyledModal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        contentLabel="Example Modal"
        ariaHideApp={false}
        darkMode={darkMode}
      >
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice #{invoice._id}? This action
          cannot be undone.
        </p>
        <div className="modal-buttons">
          <Button color="white" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" className="delete-button" onClick={deleteInvoice}>
            Delete
          </Button>
        </div>
      </StyledModal>
      <GoBack darkMode={darkMode}>
        <div>
          <Link to="/invoices">
            <FontAwesomeIcon icon={faChevronLeft} className="fa-chevron-left" />
            <span> Go Back</span>
          </Link>
          {width < 475 && (
            <StyledStatus
              status={status}
              className="status--mobile"
              darkMode={darkMode}
            >
              <span>
                <FontAwesomeIcon icon={faCircle} className="fa-circle" />
                {_.capitalize(status)}
              </span>
            </StyledStatus>
          )}
        </div>
      </GoBack>
      <Container>
        {width >= 701 && (
          <InvoiceActions darkMode={darkMode}>
            <div>
              <span>Status</span>
              <StyledStatus
                status={status}
                className="status--normal"
                darkMode={darkMode}
              >
                <span>
                  <FontAwesomeIcon icon={faCircle} className="fa-circle" />
                  {_.capitalize(status)}
                </span>
              </StyledStatus>
            </div>
            <div>
              <Button color="white" onClick={() => setEditInvoiceOpen(true)}>
                Edit
              </Button>
              <Button color="red" onClick={() => setDeleteModalOpen(true)}>
                Delete
              </Button>
              {status !== "draft" && (
                <Button onClick={() => toggleStatus()}>
                  Mark as {status === "pending" ? "Paid" : "Pending"}
                </Button>
              )}
            </div>
          </InvoiceActions>
        )}
        {width < 701 && (
          <StyledStatus
            status={invoice.status}
            className="status--normal"
            darkMode={darkMode}
          >
            <span>
              <FontAwesomeIcon icon={faCircle} className="fa-circle" />
              {_.capitalize(invoice.status)}
            </span>
          </StyledStatus>
        )}
        <InvoiceInfo darkMode={darkMode}>
          <div className="info-section-1">
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
          <div className="invoice-main">
            <div>
              <div className="invoice-date">
                <span>Invoice Date</span>
                <h2>{format(new Date(invoice.createdAt), "L-d-yyyy")}</h2>
              </div>
              <div className="payment-due">
                <span>Payment Due</span>
                <h2>{format(new Date(invoice.paymentDue), "L-d-yyyy")}</h2>
              </div>
            </div>
            <div className="bill-to">
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
          <ItemList
            items={invoice.items}
            total={invoice.total}
            darkMode={darkMode}
          />
        </InvoiceInfo>
      </Container>

      {width < 701 && (
        <InvoiceActions darkMode={darkMode}>
          <div>
            <Button color="white" onClick={() => setEditInvoiceOpen(true)}>
              Edit
            </Button>
            <Button color="red" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
            <Button onClick={() => toggleStatus()}>
              Mark as {status === "pending" ? "Paid" : "Pending"}
            </Button>
          </div>
        </InvoiceActions>
      )}
      {editInvoiceOpen && (
        <NewInvoiceForm
          handleFormOpened={setEditInvoiceOpen}
          editMode
          editedInvoice={invoice}
          setStatus={setStatus}
        />
      )}
    </>
  );
}
