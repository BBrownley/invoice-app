import React, { useState } from "react";

import FormItemList from "../FormItemList/FormItemList";

import { format } from "date-fns";

import { FormInput } from "../shared/FormInput.elements";
import {
  StyledDatePickerContainer,
  StyledDatePicker
} from "../shared/Datepicker.elements";
import { StyledSelect as Select } from "../shared/Dropdown.elements";
import { Container, Wrapper } from "./NewInvoiceForm.elements";

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

export default function NewInvoiceForm() {
  const [formValues, setFormValues] = useState({
    fromAddress: "",
    fromCity: "",
    fromPostCode: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    description: "",
    createdAt: new Date(),
    paymentTerms: netDays[netDays.length - 1] // {label: string, value: int}
  });

  const [startDate, setStartDate] = useState(new Date());

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

  return (
    <Container>
      <Wrapper>
        <h2>New Invoice</h2>
        <form>
          <h4>Bill From</h4>

          <label htmlFor="fromAddress">Street Address</label>
          <FormInput
            type="text"
            id="fromAddress"
            name="fromAddress"
            value={formValues.fromAddress}
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

          <label htmlFor="clientAddress">Street Address</label>
          <FormInput
            type="text"
            id="clientAddress"
            name="clientAddress"
            value={formValues.clientAddress}
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
        <FormItemList />
      </Wrapper>
    </Container>
  );
}
