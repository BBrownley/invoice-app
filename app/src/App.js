import { Container } from "./App.elements";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
