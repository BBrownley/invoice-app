import { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { setStoredToken } from "./services/tokenUtil";

import { Container } from "./App.elements";

import { InvoiceProvider } from "./InvoiceContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

import Sidebar from "./components/Sidebar/Sidebar";
import InvoicesView from "./components/InvoicesView/InvoicesView";
import SingleInvoiceView from "./components/SingleInvoiceView/SingleInvoiceView";
import Login from "./components/Login/Login";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setStoredToken(storedUser);
      history.push("/invoices");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <InvoiceProvider>
        <Container>
          <Sidebar />
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
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
