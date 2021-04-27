import React, { useState, useEffect } from "react";
import { add, format } from "date-fns";
import invoiceService from "../../services/invoices";
import FormItemList from "../FormItemList/FormItemList";

import { FormInput } from "../shared/FormInput.elements";
import { Button } from "../shared/Button.elements";
import {
  StyledDatePickerContainer,
  StyledDatePicker
} from "../shared/Datepicker.elements";
import { StyledSelect as Select } from "../shared/Dropdown.elements";
import {
  Container,
  DarkBkg,
  Wrapper,
  FormBottom
} from "./NewInvoiceForm.elements";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const netDays = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" }
];

export default function NewInvoiceForm({ handleFormOpened }) {
  const [formValues, setFormValues] = useState({
    fromStreet: "",
    fromCity: "",
    fromPostCode: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    description: "",
    createdAt: new Date(),
    paymentTerms: netDays[netDays.length - 1] // {label: string, value: int}
  });

  const [items, setItems] = useState([
    {
      name: "",
      quantity: 0,
      price: 0,
      total: 0
    }
  ]);

  const [formError, setFormError] = useState("All fields must be added");

  useEffect(() => {
    setFormError("");
  }, [items, formValues]);

  const handleFormInput = e => {
    setFormValues(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleTerms = e => {
    setFormValues(prevState => {
      return { ...prevState, paymentTerms: e };
    });
  };

  const handleDate = e => {
    // format(e, "L-d-yyyy")
    setFormValues(prevState => {
      return { ...prevState, createdAt: e };
    });
  };

  const validateInvoice = invoice => {
    if (invoice.status === "pending") {
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
      // Submitted invoices must be either pending or draft
      throw new Error("An unexpected error has occured");
    }
    return invoice;
  };

  const handleFormSubmit = async status => {
    // Format data
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

    try {
      const validatedInvoice = await validateInvoice(newInvoice);
      invoiceService.add(validatedInvoice);
    } catch (exception) {
      setFormError(exception.message); // Create new error element out of exception msg
    }
  };

  return (
    <Container>
      <Wrapper>
        <h2>New Invoice</h2>
        <form>
          <h4>Bill From</h4>

          <label htmlFor="fromStreet">Street Address</label>
          <FormInput
            type="text"
            id="fromStreet"
            name="fromStreet"
            value={formValues.fromStreet}
            onChange={handleFormInput}
          />

          <div className="form-row main">
            <div>
              <label htmlFor="fromCity">City</label>
              <FormInput
                type="text"
                id="fromCity"
                name="fromCity"
                value={formValues.fromCity}
                onChange={handleFormInput}
              />
            </div>
            <div>
              <label htmlFor="fromPostCode">Post Code</label>
              <FormInput
                type="text"
                id="fromPostCode"
                name="fromPostCode"
                value={formValues.fromPostCode}
                onChange={handleFormInput}
              />
            </div>
            <div>
              <label htmlFor="fromCountry">Country</label>
              <FormInput
                type="text"
                id="fromCountry"
                name="fromCountry"
                value={formValues.fromCountry}
                onChange={handleFormInput}
              />
            </div>
          </div>
          <h4>Bill To</h4>
          <label htmlFor="clientName">Client's Name</label>
          <FormInput
            type="text"
            id="clientName"
            name="clientName"
            value={formValues.clientName}
            onChange={handleFormInput}
          />

          <label htmlFor="clientEmail">Client's Email</label>
          <FormInput
            type="text"
            id="clientEmail"
            name="clientEmail"
            value={formValues.clientEmail}
            onChange={handleFormInput}
          />

          <label htmlFor="clientStreet">Street Address</label>
          <FormInput
            type="text"
            id="clientStreet"
            name="clientStreet"
            value={formValues.clientStreet}
            onChange={handleFormInput}
          />

          <div className="form-row main">
            <div>
              <label htmlFor="clientCity">City</label>
              <FormInput
                type="text"
                id="clientCity"
                name="clientCity"
                value={formValues.clientCity}
                onChange={handleFormInput}
              />
            </div>
            <div>
              <label htmlFor="clientPostCode">Post Code</label>
              <FormInput
                type="text"
                id="clientPostCode"
                name="clientPostCode"
                value={formValues.clientPostCode}
                onChange={handleFormInput}
              />
            </div>
            <div>
              <label htmlFor="clientCountry">Country</label>
              <FormInput
                type="text"
                id="clientCountry"
                name="clientCountry"
                value={formValues.clientCountry}
                onChange={handleFormInput}
              />
            </div>
          </div>

          <div className="form-row secondary">
            <div>
              <label htmlFor="invoiceDate">Invoice Date</label>
              <StyledDatePickerContainer id="datepicker">
                <StyledDatePicker
                  selected={formValues.createdAt}
                  onChange={date => handleDate(date)}
                  minDate={new Date()}
                  dateFormatCalendar={"MMM yyyy"}
                  name="invoiceDate"
                  value={formValues.createdAt}
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="calendar-icon"
                />
              </StyledDatePickerContainer>
            </div>
            <div className="select-wrapper">
              <label htmlFor="paymentTerms">Payment Terms</label>
              <Select
                options={netDays}
                isSearchable={false}
                value={formValues.paymentTerms}
                name="paymentTerms"
                onChange={handleTerms}
              />
            </div>
          </div>

          <label htmlFor="description">Project Description</label>
          <FormInput
            type="text"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleFormInput}
          />
        </form>
        <FormItemList items={items} setItems={setItems} />
      </Wrapper>

      <FormBottom>
        <p className="form-error">{formError}</p>
        <div className="options">
          <div>
            {" "}
            <Button color="white" onClick={() => handleFormOpened(false)}>
              Discard
            </Button>
          </div>

          <div className="btns-right">
            {" "}
            <Button
              className="save-as"
              color="black"
              onClick={() => handleFormSubmit("draft")}
            >
              Save as Draft
            </Button>
            <Button onClick={() => handleFormSubmit("pending")}>
              Save &#38; Send
            </Button>
          </div>
        </div>
      </FormBottom>
      <DarkBkg></DarkBkg>
    </Container>
  );
}
