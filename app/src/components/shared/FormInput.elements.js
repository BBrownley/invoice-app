import styled, { css } from "styled-components";

export const FormInput = styled.input`
  padding: 1.25rem;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  border: 1px solid ${props => props.theme.colors.white500};
  border-radius: 0.25rem;
  min-width: 240px;
  font-size: 0.75rem;
  &:active,
  :focus {
    outline: none;
    border: 1px solid ${props => props.theme.colors.primary};
    caret-color: ${props => props.theme.colors.primary};
  }
`;
