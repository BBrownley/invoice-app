import styled, { css } from "styled-components";
import { FormInput } from "./FormInput.elements";
import Select from "react-select";

export const StyledSelect = styled(Select)`
  .css-yk16xz-control {
    height: 52px;
    &:hover {
      cursor: pointer;
      border: 1px solid ${props => props.theme.colors.primary};
    }
    &:active,
    :focus {
      border: 1px solid ${props => props.theme.colors.primary};
      outline: none;
    }
    ${props => {
      if (props.secondary) {
        return css`
          background: none;
          border: 1px solid transparent;
          &:hover {
            border: 1px solid transparent;
          }
          &:focus {
            background: none;
          }
        `;
      }
    }}
  }
  .css-1pahdxg-control {
    height: 52px;
    box-shadow: none;
    border: 1px solid transparent;
    &:hover {
      cursor: pointer;
    }
    ${props => {
      if (props.secondary) {
        return css`
          background: none;
          &:hover {
            border: 1px solid transparent;
          }
        `;
      }
    }}
  }
  .css-1uccc91-singleValue {
    font-weight: bold;
  }
  .css-26l3qy-menu {
    margin: 0;
    margin-top: 25px;
    filter: drop-shadow(0 12px 0.75rem rgba(0, 0, 0, 0.025));
    border-radius: 0.5rem;
    ${props => {
      if (props.custom) {
        return css`
          display: none;
        `;
      }
    }}
  }
  .css-4ljt47-MenuList {
    border: none;
    padding: 0;
    font-weight: bold;
    width: 100%;
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
  .css-g1d714-ValueContainer {
    padding-left: 1.25rem;
  }
  .css-tlfecz-indicatorContainer {
    ${props => {
      if (props.secondary) {
        return css`
          color: ${props.theme.colors.primary};
        `;
      }
    }}
  }
`;
