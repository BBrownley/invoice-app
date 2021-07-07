import styled, { css, keyframes } from "styled-components";
import { StyledSelect } from "../shared/Dropdown.elements";
import { Button } from "../shared/Button.elements";
import ScrollbarStyle from "../shared/mixins/Scrollbar.elements";

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding-left: 100px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 60px;
  }
`;

export const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 80px 10px 0 10px;
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
  ${ScrollbarStyle}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 130px;
  > div:nth-of-type(2) {
    align-items: flex-start;
    display: flex;
    button {
      margin-left: 2.5rem;
    }
    .select-container {
      width: 193px;
      margin-right: -52px;
    }
  }
  .invoice-count {
    font-weight: 500;
    color: ${props =>
      props.darkMode
        ? props.theme.colors.white500
        : props.theme.colors.gray500};
    margin-top: 0.625rem;
  }
`;

const openOptions = keyframes`
  from {
    /* transform: rotate(0deg); */
    opacity: 0;
    margin-top: -6px;
  }

  to {
    /* transform: rotate(360deg); */
    opacity: 1;
    margin-top: 12px;
  }
`;

export const Options = styled.div`
  width: 192px;
  height: 128px;
  border-radius: 0.5rem;
  margin-left: -12px;
  margin-top: 12px;
  padding-left: 1.5rem;
  -webkit-box-shadow: 5px 5px 15px 3px rgba(0, 0, 0, 0.12);
  box-shadow: 5px 5px 15px 3px rgba(0, 0, 0, 0.12);
  background-color: white;
  /* display: none; */
  flex-direction: column;

  @media (max-width: 630px) {
    margin-left: 18px;
    width: 140px;
  }

  [class="closing"] {
    opacity: 0;
    transition: 0.5s;
    background-color: blue;
  }

  .closing {
    opacity: 0;
    transition: 0.5s;
    background-color: blue;
  }

  input[type="checkbox"] {
    background-color: blue;
  }
  > div {
    border: 1px dashed;
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 29px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    left: 0;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: ${props => props.theme.colors.white500};
    border-radius: 2px;
  }

  .container:hover input ~ .checkmark {
    border: 1px solid ${props => props.theme.colors.primary};
  }

  .container input ~ .checkmark {
    border: 1px solid transparent;
  }

  .container input:checked ~ .checkmark {
    background-color: ${props => props.theme.colors.primary};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 5px;
    top: 1.3px;
    width: 3px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .draft {
    top: 24px;
  }

  .pending {
    top: 28px;
  }

  .paid {
    top: 32px;
  }

  /* Handle open/close animation*/

  animation: ${openOptions} 0.25s linear;
  transition: 0.25s;
  position: relative;

  ${props => {
    if (props.opened) {
      return css`
        display: flex;
        z-index: 10000;
      `;
    } else {
      return css`
        opacity: 0;
        margin-top: -6px;
        z-index: -10000;
      `;
    }
  }}
`;

export const Select = styled(StyledSelect)`
  .css-yk16xz-control,
  .css-1pahdxg-control {
    width: 154px;
  }
  .css-2b097c-container {
    display: flex;
    justify-content: center;
  }
`;

export const StyledButton = styled(Button)`
  align-self: end;
`;

export const CustomDropdown = styled.div`
  margin-top: 7px;
  margin-right: -37px;
  @media (max-width: 630px) {
    margin-right: -66px;
  }
`;

export const CustomDropdownHeader = styled.div`
  padding: 10px 0;
  font-weight: bold;
  margin-left: -10px;
  width: 190px;
  text-align: center;

  .angle-icon {
    margin-left: 15px;
    transition: 0.25s;
    backface-visibility: hidden;
    color: ${props => props.theme.colors.primary};

    ${props => {
      if (props.opened) {
        return css`
          transform: rotate(180deg);
        `;
      } else {
        return css`
          transform: rotate(0deg);
        `;
      }
    }}
  }
  &:hover {
    cursor: pointer;
  }
`;
