import React, { useState, useRef, useEffect } from "react";
import invoiceService from "../../services/invoices";

import useScreenWidth from "../custom-hooks/useScreenWidth";
import { useDarkMode } from "../../darkModeContext";

import Sidebar from "../Sidebar/Sidebar";
import InvoicesList from "../InvoicesList/InvoicesList";
import NewInvoiceForm from "../NewInvoiceForm/NewInvoiceForm";

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
  const [filterSelectOpen, setFilterSelectOpen] = useState(false);
  const [allInvoices, setAllInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [filters, setFilters] = useState(["draft", "pending", "paid"]);
  const [selectOpened, setSelectOpened] = useState(false);
  const [formOpened, setFormOpened] = useState(false);

  let optionsRef = useRef(null);

  const darkMode = useDarkMode();

  const handleFilterSelectOpen = () => {
    if (!selectOpened) {
      setSelectOpened(true);
    }
    setFilterSelectOpen(prevState => !prevState);
  };

  const width = useScreenWidth();

  const handleCloseDropdown = e => {
    try {
      if (
        e.target !== optionsRef.current &&
        filterSelectOpen &&
        !optionsRef.current.contains(e.target)
      ) {
        setFilterSelectOpen(false);
      }
    } catch (exception) {
      setFilterSelectOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseDropdown);
    return () => window.removeEventListener("click", handleCloseDropdown);
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      if (localStorage.getItem("loggedUser")) {
        const invoices = await invoiceService.getInvoices();
        setInvoices(invoices);
        setAllInvoices(invoices);
      } else {
        // Set up guest invoices
        if (!localStorage.getItem("guestInvoices")) {
          const starterInvoices = await invoiceService.getGuestInvoices();
          localStorage.setItem(
            "guestInvoices",
            JSON.stringify(starterInvoices)
          );
          setInvoices(starterInvoices);
          setAllInvoices(starterInvoices);
        } else {
          const guestInvoices = await JSON.parse(
            localStorage.getItem("guestInvoices")
          );
          setInvoices(guestInvoices);
          setAllInvoices(guestInvoices);
        }
      }
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
    <>
      <Sidebar />
      <Container>
        <Wrapper>
          <Header darkMode={useDarkMode()}>
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
                {selectOpened && (
                  <Options
                    opened={filterSelectOpen}
                    ref={optionsRef}
                    darkMode={darkMode}
                  >
                    <label className="container draft">
                      Draft
                      <input
                        type="checkbox"
                        id="filter-draft"
                        name="filter-draft"
                        value="draft"
                        checked={filters.includes("draft")}
                        onChange={e => handleFilterCheckbox(e)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container pending">
                      Pending
                      <input
                        type="checkbox"
                        id="filter-pending"
                        name="filter-pending"
                        value="pending"
                        checked={filters.includes("pending")}
                        onChange={e => handleFilterCheckbox(e)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container paid">
                      Paid
                      <input
                        type="checkbox"
                        id="filter-paid"
                        name="filter-paid"
                        value="paid"
                        checked={filters.includes("paid")}
                        onChange={e => handleFilterCheckbox(e)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </Options>
                )}
              </CustomDropdown>

              <StyledButton name="new" onClick={() => setFormOpened(true)}>
                <div className="plus-button"></div>
                <span>{width >= 550 ? "New Invoice" : "New"}</span>
              </StyledButton>
            </div>
          </Header>
          <InvoicesList invoices={invoices} handleSelectInvoice />
          {formOpened && (
            <NewInvoiceForm
              handleFormOpened={setFormOpened}
              setAllInvoices={setAllInvoices}
              setInvoices={setInvoices}
            />
          )}
        </Wrapper>
      </Container>
    </>
  );
}
