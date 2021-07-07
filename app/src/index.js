import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./reset.css";

import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

import { InvoiceProvider } from "./InvoiceContext";
import { DarkModeProvider } from "./darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <InvoiceProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </InvoiceProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
