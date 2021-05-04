import React, { useState, useEffect } from "react";

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

import helpers from "./helpers";

const netDays = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" }
];

export default function NewInvoiceForm({
  handleFormOpened,
  setAllInvoices,
  editMode,
  editedInvoice
}) {
  const [formValues, setFormValues] = useState({
    fromStreet: editedInvoice ? editedInvoice.senderAddress.street : "",
    fromCity: editedInvoice ? editedInvoice.senderAddress.city : "",
    fromPostCode: editedInvoice ? editedInvoice.senderAddress.postCode : "",
    fromCountry: editedInvoice ? editedInvoice.senderAddress.country : "",
    clientName: editedInvoice?.clientName || "",
    clientEmail: editedInvoice?.clientEmail || "",
    clientStreet: editedInvoice ? editedInvoice.clientAddress.street : "",
    clientCity: editedInvoice ? editedInvoice.clientAddress.city : "",
    clientPostCode: editedInvoice ? editedInvoice.clientAddress.postCode : "",
    clientCountry: editedInvoice ? editedInvoice.clientAddress.country : "",
    description: editedInvoice?.description || "",
    createdAt: new Date(),
    paymentTerms: editedInvoice
      ? {
          label: `Net ${editedInvoice?.paymentTerms} Days`,
          value: editedInvoice?.paymentTerms
        }
      : netDays[netDays.length - 1] // {label: string, value: int}
  });

  const [items, setItems] = useState(
    editedInvoice
      ? editedInvoice.items
      : [
          {
            name: "",
            quantity: 0,
            price: 0,
            total: 0
          }
        ]
  );

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
    setFormValues(prevState => {
      return { ...prevState, createdAt: e };
    });
  };

  const handleFormSubmit = async status => {
    const newInvoice = helpers.formatInvoice(formValues, items, status);

    try {
      const validatedInvoice = await helpers.validateInvoice(newInvoice);
      invoiceService.add(validatedInvoice);
      handleFormOpened(false);
      setAllInvoices(validatedInvoice);
    } catch (exception) {
      setFormError(exception.message);
    }
  };

  console.log(editedInvoice?.status);

  const handleEditInvoice = async () => {
    const newInvoice = helpers.formatInvoice(
      formValues,
      items,
      editedInvoice.status
    );
    try {
      const validatedInvoice = await helpers.validateInvoice(newInvoice);
      invoiceService.updateInvoice({
        ...validatedInvoice,
        ownerId: editedInvoice.ownerId,
        _id: editedInvoice._id
      });
    } catch (exception) {
      setFormError(exception.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <h2>
          {editMode
            ? `Edit #...${editedInvoice._id
                .toUpperCase()
                .substring(editedInvoice._id.length - 6)}`
            : "New Invoice"}
        </h2>
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
          {!editMode && (
            <div className="create-invoice-options">
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
          )}
          {editMode && (
            <div className="edit-invoice-options">
              <div>
                {" "}
                <Button color="white" onClick={() => handleFormOpened(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleEditInvoice()}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </FormBottom>
      <DarkBkg></DarkBkg>
    </Container>
  );
}
