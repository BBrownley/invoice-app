import React, { useState } from "react";
import { Container } from "./App.elements";
import { Button } from "./components/shared/Button.elements";
import { FormInput } from "./components/shared/FormInput.elements";

import { ThemeProvider } from "styled-components";
import theme from "./theme";

import { StyledSelect } from "./components/shared/Dropdown.elements";

const options = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" }
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.primary : theme.colors.black600,
    backgroundColor: state.isSelected ? "" : ""
  })
};

function App() {
  const [selectedOption, setSelectedOption] = useState(
    options[options.length - 1]
  );

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

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

        <Button name="new">
          <div className="plus-button"></div>
          <span>New Invoice</span>
        </Button>
        <Button>Mark as Paid</Button>
        <Button color="white">Edit</Button>
        <Button color="black">Edit</Button>
        <Button color="gray">Save as Draft</Button>
        <Button color="red">Delete</Button>
        <Button size="large" color="white">
          + Add New Item
        </Button>
        <FormInput value="Lorem Ipsum Dolor" />
        <br></br>

        <div style={{ width: "240px", marginLeft: "300px" }}>
          <StyledSelect
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isSearchable={false}
            styles={customStyles}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
