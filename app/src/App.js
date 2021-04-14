import { Container } from "./App.elements";
import { Button } from "./components/shared/Button.elements";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>Aliquam porttitor mauris sit amet orci Aenean</h1>
        <h2>Aliquam porttitor mauris sit amet orci Aenean</h2>
        <h3>Aliquam porttitor mauris sit amet orci Aenean</h3>
        <h4>Aliquam porttitor mauris sit amet orci Aenean</h4>

        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
          vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
          laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor
          eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
        </p>
        <p>
          Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
          luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
          commodo quis, gravida id, est. Sed lectus. Praesent elementum
          hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat,
          lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc
          sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
          dapibus sed, urna.
        </p>

        <p className="body-secondary">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
          vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
          laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor
          eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
        </p>

        <Button>Mark as Paid</Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
