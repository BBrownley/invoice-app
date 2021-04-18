import React, { useState } from "react";

import {
  Container,
  Wrapper,
  Header,
  Filters,
  Select,
  StyledButton
} from "./InvoicesView.elements";
import { Button } from "../shared/Button.elements";

export default function InvoicesView() {
  const [filterSelectOpen, setFilterSelectOpen] = useState(true);

  return (
    <Container>
      <Wrapper>
        <Header>
          <div>
            <h1>Invoices</h1>
            <p>No invoices</p>
          </div>
          <div>
            <div className="select-container">
              <Select
                value={{ label: "Filter by status" }}
                onChange={() => {}}
                isSearchable={false}
                readOnly
                secondary
                custom
                menuIsOpen={false}
              />
              <Filters>
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
              </Filters>
            </div>
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
