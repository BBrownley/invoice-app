import styled, { css } from "styled-components";

export const Container = styled.div`
  font-family: "Spartan", sans-serif;
  height: 100vh;

  background-color: ${props =>
    props.darkMode ? props.theme.colors.black500 : props.theme.colors.white600};

  color: ${props => (props.darkMode ? "white" : props.theme.colors.black600)};

  .gray-500 {
    color: ${props => props.theme.colors.gray500};
  }
`;
