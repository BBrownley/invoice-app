import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

import { useDarkMode } from "../../darkModeContext";
import { useInvoiceUpdate } from "../../InvoiceContext";
import useScreenWidth from "../custom-hooks/useScreenWidth";

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
  InvoiceForm,
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
  setInvoices,
  editMode,
  editedInvoice,
  setStatus
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

  const width = useScreenWidth();
  const darkMode = useDarkMode();
  const updateInvoice = useInvoiceUpdate();

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
      const validatedInvoice = helpers.validateInvoice(newInvoice);
      let serverGeneratedInvoice;

      if (!localStorage.getItem("loggedUser")) {
        const prevGuestInvoices = JSON.parse(
          localStorage.getItem("guestInvoices")
        );
        const updatedGuestInvoices = [
          ...prevGuestInvoices,
          { ...newInvoice, _id: uniqid() }
        ];
        localStorage.setItem(
          "guestInvoices",
          JSON.stringify(updatedGuestInvoices)
        );
        setInvoices(updatedGuestInvoices);
        setAllInvoices(updatedGuestInvoices);
      } else {
        serverGeneratedInvoice = await invoiceService.add(validatedInvoice);
        setInvoices(prevState => [...prevState, serverGeneratedInvoice]);
        setAllInvoices(prevState => [...prevState, serverGeneratedInvoice]);
      }

      handleFormOpened(false);
    } catch (exception) {
      setFormError(exception.message);
    }
  };

  const handleEditInvoice = async () => {
    const formattedInvoice = helpers.formatInvoice(
      formValues,
      items,
      editedInvoice.status
    );

    try {
      // Invoices that are pending or paid need to be validated first
      const validatedInvoice =
        editedInvoice.status !== "draft"
          ? await helpers.validateInvoice(formattedInvoice)
          : formattedInvoice;

      let updatedInvoice = {
        ...validatedInvoice,
        ownerId: editedInvoice.ownerId,
        _id: editedInvoice._id
      };

      if (localStorage.getItem("username") !== null) {
        // Update invoice in backend
        const data = await invoiceService.updateInvoice(updatedInvoice);

        if (editedInvoice.status === "draft" && data?.makePending) {
          // makePending is defined when all fields are filled in
          invoiceService.setStatus(editedInvoice, "pending");
          updatedInvoice = { ...updatedInvoice, status: "pending" };
          setStatus("pending");
        }
      } else {
        // update guest invoices
        const invoiceId = updatedInvoice._id;
        const updatedInvoices = JSON.parse(
          localStorage.getItem("guestInvoices")
        ).map(invoice => {
          if (invoiceId === invoice._id) {
            return updatedInvoice;
          }
          return invoice;
        });
        localStorage.setItem("guestInvoices", JSON.stringify(updatedInvoices));
      }

      // Update invoice in current view
      updateInvoice(updatedInvoice);
      // Persist updated invoice values when refreshing
      window.localStorage.setItem(
        "currentInvoice",
        JSON.stringify(updatedInvoice)
      );

      handleFormOpened(false);
    } catch (exception) {
      setFormError(exception.message);
    }
  };

  return (
    <Container darkMode={darkMode}>
      <Wrapper>
        <h2>
          {editMode
            ? `Edit #...${editedInvoice._id
                .toUpperCase()
                .substring(editedInvoice._id.length - 6)}`
            : "New Invoice"}
        </h2>
        <InvoiceForm darkMode={darkMode}>
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
            <div className="form-field from-city">
              <label htmlFor="fromCity">City</label>
              <FormInput
                type="text"
                id="fromCity"
                name="fromCity"
                value={formValues.fromCity}
                onChange={handleFormInput}
              />
            </div>
            <div className="form-field from-post-code">
              <label htmlFor="fromPostCode">Post Code</label>
              <FormInput
                type="text"
                id="fromPostCode"
                name="fromPostCode"
                value={formValues.fromPostCode}
                onChange={handleFormInput}
              />
            </div>
            {width < 700 && <div className="break"></div>}
            <div className="form-field from-country">
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
            <div className="form-field client-city">
              <label htmlFor="clientCity">City</label>
              <FormInput
                type="text"
                id="clientCity"
                name="clientCity"
                value={formValues.clientCity}
                onChange={handleFormInput}
              />
            </div>
            <div className="form-field client-post-code">
              <label htmlFor="clientPostCode">Post Code</label>
              <FormInput
                type="text"
                id="clientPostCode"
                name="clientPostCode"
                value={formValues.clientPostCode}
                onChange={handleFormInput}
              />
            </div>
            {width < 700 && <div className="break"></div>}
            <div className="form-field client-country">
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
            <div className="form-field invoice-date">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <StyledDatePickerContainer id="datepicker" darkMode={darkMode}>
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
            {width < 700 && <div className="break"></div>}
            <div className="select-wrapper">
              <label htmlFor="paymentTerms">Payment Terms</label>
              <Select
                options={netDays}
                isSearchable={false}
                value={formValues.paymentTerms}
                name="paymentTerms"
                onChange={handleTerms}
                darkMode={darkMode}
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
        </InvoiceForm>
        <FormItemList items={items} setItems={setItems} />
      </Wrapper>

      <FormBottom darkMode={darkMode}>
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
            <div>
              <div
                className={[
                  `edit-invoice-options edit-invoice-options${
                    editedInvoice.status === "draft" ? "--draft" : ""
                  }`
                ]}
              >
                {editedInvoice.status === "draft" && (
                  <p className="draft-warning">
                    &bull; Invoice will remain as draft until all fields are
                    filled and at least one item has been named
                  </p>
                )}
                <div
                  className={`edit-invoice-options__btns edit-invoice-options__btns${
                    editedInvoice.status === "draft" ? "--draft" : ""
                  }`}
                >
                  {" "}
                  <Button color="white" onClick={() => handleFormOpened(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleEditInvoice()}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </FormBottom>
      <DarkBkg></DarkBkg>
    </Container>
  );
}
