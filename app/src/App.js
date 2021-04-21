import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { Container } from "./App.elements";

import { InvoiceProvider } from "./InvoiceContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

import Sidebar from "./components/Sidebar/Sidebar";
import InvoicesView from "./components/InvoicesView/InvoicesView";
import SingleInvoiceView from "./components/SingleInvoiceView/SingleInvoiceView";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <InvoiceProvider>
        <Container>
          <Sidebar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <InvoicesView handleSelectInvoice={setSelectedInvoice} />
              )}
            />
            <Route
              exact
              path="/invoices/:id"
              render={() => <SingleInvoiceView invoice={selectedInvoice} />}
            />
          </Switch>
        </Container>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
