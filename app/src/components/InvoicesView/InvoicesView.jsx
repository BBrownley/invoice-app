import React, { useState, useRef, useEffect } from "react";

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

  return (
    <Container>
      <Wrapper>
        <Header>
          <div>
            <h1>Invoices</h1>
            <p>No invoices</p>
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
      </Wrapper>
    </Container>
  );
}
