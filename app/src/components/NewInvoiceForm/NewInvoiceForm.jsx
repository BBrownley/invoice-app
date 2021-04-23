import React, { useState } from "react";

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
    desc: ""
  });

  const [startDate, setStartDate] = useState(new Date());

  const handleFormInput = e => {
    setFormValues(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <Container>
      <Wrapper>
        <h2>New Invoice</h2>
        <form onChange={e => handleFormInput(e)}>
          <h4>Bill From</h4>

          <label for="fromAddress">Street Address</label>
          <FormInput
            type="text"
            id="fromAddress"
            name="fromAddress"
            value={formValues.fromAddress}
          />

          <div className="form-row main">
            <div>
              <label for="fromCity">City</label>
              <FormInput
                type="text"
                id="fromCity"
                name="fromCity"
                value={formValues.fromCity}
              />
            </div>
            <div>
              <label for="fromPostCode">Post Code</label>
              <FormInput
                type="text"
                id="fromPostCode"
                name="fromPostCode"
                value={formValues.fromPostCode}
              />
            </div>
            <div>
              <label for="fromCountry">Country</label>
              <FormInput
                type="text"
                id="fromCountry"
                name="fromCountry"
                value={formValues.fromCountry}
              />
            </div>
          </div>
          <h4>Bill To</h4>
          <label for="clientName">Client's Name</label>
          <FormInput
            type="text"
            id="clientName"
            name="clientName"
            value={formValues.clientName}
          />

          <label for="clientEmail">Client's Email</label>
          <FormInput
            type="text"
            id="clientEmail"
            name="clientEmail"
            value={formValues.clientEmail}
          />

          <label for="clientAddress">Street Address</label>
          <FormInput
            type="text"
            id="clientAddress"
            name="clientAddress"
            value={formValues.clientAddress}
          />

          <div className="form-row main">
            <div>
              <label for="clientCity">City</label>
              <FormInput
                type="text"
                id="clientCity"
                name="clientCity"
                value={formValues.clientCity}
              />
            </div>
            <div>
              <label for="clientPostCode">Post Code</label>
              <FormInput
                type="text"
                id="clientPostCode"
                name="clientPostCode"
                value={formValues.clientPostCode}
              />
            </div>
            <div>
              <label for="clientCountry">Country</label>
              <FormInput
                type="text"
                id="clientCountry"
                name="clientCountry"
                value={formValues.clientCountry}
              />
            </div>
          </div>

          <div className="form-row secondary">
            <div>
              <label for="invoiceDate">Invoice Date</label>
              <StyledDatePickerContainer id="datepicker">
                <StyledDatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  dateFormatCalendar={"MMM yyyy"}
                  name="invoiceDate"
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="calendar-icon"
                />
              </StyledDatePickerContainer>
            </div>
            <div className="select-wrapper">
              <label for="paymentTerms">Payment Terms</label>
              <Select
                options={netDays}
                isSearchable={false}
                value={netDays[netDays.length - 1]}
                name="paymentTerms"
              />
            </div>
          </div>

          <label for="desc">Project Description</label>
          <FormInput
            type="text"
            id="desc"
            name="desc"
            value={formValues.desc}
          />
        </form>
      </Wrapper>
    </Container>
  );
}
