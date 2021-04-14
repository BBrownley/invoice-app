import styled from "styled-components";

export const Button = styled.button`
  border-radius: 100px;
  padding: 16px 25px;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  border: none;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  letter-spacing: -0.25px;
  transition: .25s;
  &:active,
  :focus {
    outline: none;
  }
  &:hover, :active, :focus {
    background-color: ${props => props.theme.colors.primaryLight};
  }
  &:hover {
    cursor: pointer;
  }
`;
