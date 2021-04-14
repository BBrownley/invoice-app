import styled, { css } from "styled-components";
import { FormInput } from "./FormInput.elements";
import Select from "react-select";

export const StyledSelect = styled(Select)`
  .css-yk16xz-control {
    &:hover {
      cursor: pointer;
      border: 1px solid ${props => props.theme.colors.primary};
    }
    &:active,
    :focus {
      border: 1px solid ${props => props.theme.colors.primary};
      outline: none;
    }
  }
  .css-1pahdxg-control {
    box-shadow: none;
    border: 1px solid ${props => props.theme.colors.primary};
    &:hover {
      border: 1px solid ${props => props.theme.colors.primary};
    }
  }
  .css-1uccc91-singleValue {
    font-weight: bold;
  }
  .css-26l3qy-menu {
    margin: 0;
    margin-top: 25px;
    filter: drop-shadow(0 12px 0.75rem rgba(0, 0, 0, 0.025));
    border-radius: 0.5rem;
  }
  .css-4ljt47-MenuList {
    border: none;
    padding: 0;
    font-weight: bold;
    > * {
      padding: 1.25rem;
      &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colors.white500};
      }
      &:hover {
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
      }
    }
  }
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
`;
