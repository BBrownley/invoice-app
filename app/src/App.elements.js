import styled from "styled-components";

export const Container = styled.div`
  font-family: "Spartan", sans-serif;
  height: 100vh;
  background-color: ${props => props.theme.colors.white600};
  .gray-500 {
    color: ${props => props.theme.colors.gray500};
  }
`;
