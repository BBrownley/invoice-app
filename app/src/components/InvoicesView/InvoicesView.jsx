import React, { useState, useRef, useEffect } from "react";
import invoiceService from "../../services/invoices";

import InvoicesList from "../InvoicesList/InvoicesList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Wrapper,
  Header,
  Options,
  Select,
  StyledButton,
  CustomDropdown,
  CustomDropdownHeader
} from "./InvoicesView.elements";
import { Button } from "../shared/Button.elements";

export default function InvoicesView() {
  const [filterSelectOpen, setFilterSelectOpen] = useState(true);
  const [allInvoices, setAllInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [filters, setFilters] = useState(["draft", "pending", "paid"]);

  let optionsRef = useRef(null);

  const handleFilterSelectOpen = () => {
    setFilterSelectOpen(prevState => !prevState);
  };

  const [width, setWidth] = useState(window.innerWidth);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  const handleCloseDropdown = e => {
    if (
      e.target !== optionsRef.current &&
      filterSelectOpen &&
      !optionsRef.current.contains(e.target)
    ) {
      setFilterSelectOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  useEffect(() => {
    window.addEventListener("click", handleCloseDropdown);
    return () => window.removeEventListener("click", handleCloseDropdown);
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoices = await invoiceService.getInvoices();
      setInvoices(invoices);
      setAllInvoices(invoices);
    };
    fetchInvoices();
  }, []);

  // Filter invoices based off status
  useEffect(() => {
    setInvoices(
      allInvoices.filter(invoice => {
        return filters.includes(invoice.status);
      })
    );
  }, [filters]);

  const handleFilterCheckbox = e => {
    // Toggle filter
    if (filters.includes(e.target.value)) {
      setFilters(prevState =>
        prevState.filter(filterValue => filterValue !== e.target.value)
      );
    } else {
      setFilters(prevState => [...prevState, e.target.value]);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <div>
            <h1>Invoices</h1>
            <p className="invoice-count">
              {invoices.length > 0
                ? `There are ${invoices.length} total invoices`
                : "No invoices"}
            </p>
          </div>
          <div>
            <CustomDropdown>
              <CustomDropdownHeader
                opened={filterSelectOpen}
                onClick={handleFilterSelectOpen}
              >
                {width > 630 ? "Filter by status" : "Filter"}{" "}
                <FontAwesomeIcon icon={faAngleDown} className="angle-icon" />
              </CustomDropdownHeader>
              <Options opened={filterSelectOpen} ref={optionsRef}>
                <label class="container draft">
                  Draft
                  <input
                    type="checkbox"
                    id="filter-draft"
                    name="filter-draft"
                    value="draft"
                    checked={filters.includes("draft")}
                    onClick={e => handleFilterCheckbox(e)}
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="container pending">
                  Pending
                  <input
                    type="checkbox"
                    id="filter-pending"
                    name="filter-pending"
                    value="pending"
                    checked={filters.includes("pending")}
                    onClick={e => handleFilterCheckbox(e)}
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="container paid">
                  Paid
                  <input
                    type="checkbox"
                    id="filter-paid"
                    name="filter-paid"
                    value="paid"
                    checked={filters.includes("paid")}
                    onClick={e => handleFilterCheckbox(e)}
                  />
                  <span class="checkmark"></span>
                </label>
              </Options>
            </CustomDropdown>
            <StyledButton name="new">
              <div className="plus-button"></div>
              <span>New Invoice</span>
            </StyledButton>
          </div>
        </Header>
        <InvoicesList invoices={invoices} />
      </Wrapper>
    </Container>
  );
}
