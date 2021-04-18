import { Switch, Route, Link } from "react-router-dom";

import { Container } from "./App.elements";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

import Sidebar from "./components/Sidebar/Sidebar";
import InvoicesView from "./components/InvoicesView/InvoicesView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={InvoicesView} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
