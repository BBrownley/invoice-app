import { useState, useRef } from "react";
import { Switch, Route, Link, useHistory, useLocation } from "react-router-dom";
import useComponentWillMount from "./components/custom-hooks/useComponentWillMount";

import { setStoredToken } from "./services/tokenUtil";

import { Container } from "./App.elements";

import { InvoiceProvider } from "./InvoiceContext";
import { DarkModeProvider } from "./darkModeContext";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

import Sidebar from "./components/Sidebar/Sidebar";
import InvoicesView from "./components/InvoicesView/InvoicesView";
import SingleInvoiceView from "./components/SingleInvoiceView/SingleInvoiceView";
import Login from "./components/Login/Login";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const history = useHistory();
  const location = useLocation();

  useComponentWillMount(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setStoredToken(storedUser);
      if (location.pathname === "/") {
        history.push("/invoices");
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <InvoiceProvider>
        <DarkModeProvider>
          <Container>
            <Switch>
              <Route
                exact
                path="/invoices"
                render={() => (
                  <InvoicesView handleSelectInvoice={setSelectedInvoice} />
                )}
              />
              <Route
                exact
                path="/invoices/:id"
                render={() => <SingleInvoiceView invoice={selectedInvoice} />}
              />
              <Route path="/" component={Login} />
            </Switch>
          </Container>
        </DarkModeProvider>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
