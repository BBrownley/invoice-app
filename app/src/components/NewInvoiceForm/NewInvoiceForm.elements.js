import styled, { keyframes } from "styled-components";
import ScrollbarStyle from "../shared/mixins/Scrollbar.elements";

const openContainer = (leftStart, leftEnd) => keyframes`
  from {
    opacity: 0;
    left: ${leftStart};
  }
  to {
    opacity: 1;
    left: ${leftEnd};
  }
`;

export const Container = styled.div`
  position: absolute;
  left: 100px;
  top: 0;
  bottom: 0;
  width: 615px;
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black500 : "white"};
  padding: 3.5rem;
  padding-bottom: 6rem;
  padding-right: 2.25rem;
  border-bottom-right-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  z-index: 10;
  animation: ${openContainer("-32rem", "6rem")} 0.25s ease;

  h4 {
    color: ${props => props.theme.colors.primary};
    margin-top: 3.5rem;
    margin-bottom: 2rem;
  }

  label {
    color: ${props => props.theme.colors.gray500};
    font-weight: normal;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 768px) {
    left: 0;
    padding-top: 10.25rem;
    animation: ${openContainer("-32rem", "0rem")} 0.25s ease;
  }
  @media (max-width: 700px) {
    width: 100vw;
    padding: 2rem;
    padding-top: 5rem;
    padding-right: 0.5rem;
    padding-bottom: 6.5rem;
    h2 {
      margin-top: 2rem;
      margin-bottom: 3rem;
      font-size: 1.5rem;
    }
  }
  @media (max-width: 350px) {
    padding-bottom: 8.5rem;
  }
`;

export const InvoiceForm = styled.form`
  label {
    color: ${props => (props.darkMode ? "white" : "")};
  }
  input {
    background-color: ${props =>
      props.darkMode ? props.theme.colors.black400 : ""};
    border-color: ${props =>
      props.darkMode ? props.theme.colors.black300 : ""};
    color: ${props => (props.darkMode ? "white" : "")};
  }
  .break {
    height: 0;
  }
  @media (max-width: 700px) {
    .form-row.main {
      flex-wrap: wrap;
    }
    .form-field.from-city,
    .form-field.from-post-code,
    .form-field.client-city,
    .form-field.client-post-code {
      flex: 1;
    }
    .form-field.from-city,
    .form-field.client-city {
      margin-right: 1rem;
    }
    .form-field.from-post-code,
    .form-field.client-post-code {
      margin-right: 0;
      margin-left: 1rem;
    }
    .form-field.from-country,
    .form-field.client-country {
      width: 100%;
      margin-left: 0;
    }
  }
`;

export const DarkBkg = styled.div`
  height: 200vw;
  width: 100vw;
  content: " ";
  background: black;
  position: absolute;
  top: 0;
  right: -100vw;
  z-index: 10;
  opacity: 0.5;
  @media (max-width: 768px) {
    bottom: 20px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  overflow: scroll;
  height: 100%;
  padding-right: 1.25rem;

  ${ScrollbarStyle}
  .form-row {
    display: flex;
    .select-wrapper {
      width: 100%;
    }
  }
  form > div {
    > div {
      margin: 0 0.75rem;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 700px) {
    .form-row .select-wrapper {
      margin-left: 0;
      margin-bottom: 1.5rem;
      /* width: 100%; */
      flex: 1;
    }
    .form-row.secondary {
      flex-wrap: wrap;
      .form-field.invoice-date {
        width: 100%;
        margin-right: 0;
        .react-datepicker-wrapper {
          width: 100%;
        }
      }
    }
  }
`;

const invoiceFormOptions = keyframes`
  from {
    bottom: -7rem;
  }
  to {
    bottom: 0rem;
  }
`;

export const FormBottom = styled.div`
  .form-error {
    position: absolute;
    z-index: 1000;
    bottom: 3.5rem;
    color: ${props => props.theme.colors.red};
  }
  .draft-warning {
    position: absolute;
    color: ${props => (props.darkMode ? "yellow" : "red")};
    width: 15rem;
  }
  .options .create-invoice-options,
  .options .edit-invoice-options {
    position: fixed;
    bottom: 0;
    left: 100px;
    z-index: 100;
    width: 615px;
    display: flex;
    justify-content: space-between;
    padding: 2rem 3.5rem;
    animation: ${invoiceFormOptions} 0.25s ease-in-out;
    background: ${props =>
      props.darkMode ? props.theme.colors.black500 : "white"};
    -webkit-box-shadow: -2px -25px 20px 0px rgba(0, 0, 0, 0.07);
    box-shadow: -2px -25px 20px 0px rgba(0, 0, 0, 0.07);
    border-top-right-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;

    .btns-right {
      display: flex;
      .save-as {
        margin-right: 1rem;
      }
    }
    @media (max-width: 768px) {
      left: 0;
    }
    @media (max-width: 700px) {
      width: 100vw;
      left: 0;
      border-radius: 0;
    }
    @media (max-width: 500px) {
      padding: 1rem;
      button {
        padding: 0.5rem;
      }
    }
    @media (max-width: 350px) {
      display: flex;
      flex-direction: column-reverse;
      padding-top: 0;

      * {
        flex: 1;
        width: 100%;
      }

      button {
        margin-top: 1rem;
      }

      .btns-right {
        display: flex;
        flex-direction: column-reverse;
      }
    }
  }

  .edit-invoice-options__btns {
    margin-left: auto;
    display: flex;
  }

  .edit-invoice-options button:first-of-type {
    margin-right: 0.5rem;
  }

  @media (max-width: 600px) {
    .options .edit-invoice-options--draft {
      text-align: center;
      padding-top: 4rem;
      .draft-warning {
        top: 1rem;
        left: 3.5rem;
        right: 3.5rem;
        width: auto;
      }
    }
  }
`;
