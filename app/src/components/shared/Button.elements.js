import styled, { css } from "styled-components";

import plusIcon from "../../assets/icon-plus.svg";

export const Button = styled.button`
  border-radius: 100px;
  padding: 16px 25px;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  font-size: 0.75rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  letter-spacing: -0.25px;
  transition: 0.25s;
  &:active,
  :focus {
    outline: none;
  }
  &:hover,
  :active,
  :focus {
    background-color: ${props => props.theme.colors.primaryLight};
  }
  &:hover {
    cursor: pointer;
  }

  .plus-button {
    height: 32px;
    width: 32px;
    background-color: white;
    border-radius: 100px;
    position: relative;
    margin: -8px 15px -8px -17px;
    &::after {
      content: " ";
      height: 11px;
      width: 11px;
      background: cyan;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url(${plusIcon});
      background-size: cover;
    }
  }

  ${props => {
    switch (props.size) {
      case "large":
        return css`
          width: 350px;
        `;
        break;
      default:
        break;
    }
  }}

  ${props => {
    switch (props.name) {
      case "new":
        return css`
          padding-right: 20px;
        `;
      default:
        break;
    }
  }}

  ${props => {
    switch (props.color) {
      case "white":
        return css`
          background-color: ${props.theme.colors.white600};
          color: ${props.theme.colors.blueGray};
          &:hover {
            background-color: ${props.theme.colors.white500};
          }
        `;
      case "black":
        return css`
          background-color: ${props.theme.colors.black400};
          color: ${props.theme.colors.white600};
          &:hover {
            background-color: ${props.theme.colors.black400};
            color: ${props.theme.colors.gray500};
          }
        `;
      case "gray":
        return css`
          background-color: ${props.theme.colors.gray400};
          color: ${props.theme.colors.gray500};
          &:hover {
            background-color: ${props.theme.colors.black600};
          }
        `;
      case "red":
        return css`
          background-color: ${props.theme.colors.red};
          color: ${props.theme.colors.white600};
          &:hover {
            background-color: ${props.theme.colors.pink};
          }
        `;
      default:
        break;
    }
  }}
`;
