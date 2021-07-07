import styled, { css } from "styled-components";
import { FormInput } from "./FormInput.elements";
import Select from "react-select";

export const StyledSelect = styled(Select)`
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  .css-yk16xz-control {
    transition: none;
    height: 52px;
    background: ${props => props.darkMode && props.theme.colors.black400};
    border-color: ${props => props.darkMode && props.theme.colors.black300};

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
    border: 1px solid ${props => props.theme.colors.primary};
    background: ${props => props.darkMode && props.theme.colors.black400};
    border-color: ${props => props.darkMode && props.theme.colors.black300};
    &:hover {
      cursor: pointer;
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
          &:hover {
            border: 1px solid transparent;
          }
        `;
      }
    }}
  }
  .css-1uccc91-singleValue {
    font-weight: bold;
    color: ${props => props.darkMode && "white"};
  }
  .css-26l3qy-menu {
    margin: 0;
    margin-top: 1rem;
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
    border-radius: 0.5rem;
    padding: 0;
    font-weight: bold;
    width: 100%;
    > * {
      background: ${props => props.darkMode && props.theme.colors.black400};
      padding: 1.25rem;
      &:not(:last-child) {
        border-bottom: 1px solid
          ${props =>
            props.darkMode
              ? props.theme.colors.black500
              : props.theme.colors.white500};
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
          transition: 1.25s;
        `;
      }
    }}
    ${props => {
      if (props.customOpen) {
        return css`
          transform: rotate(180deg);
          transition: 1.25s;
        `;
      } else {
        return css`
          transform: rotate(0deg);
          transition: 1.25s;
        `;
      }
    }}
  }
  .css-tj5bde-Svg {
    color: ${props => props.theme.colors.primary};
  }
`;
