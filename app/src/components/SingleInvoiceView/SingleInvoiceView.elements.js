import styled from "styled-components";
import { Status } from "../Invoice/Invoice.elements";
import ScrollbarStyle from "../shared/mixins/Scrollbar.elements";
import Modal from "react-modal";

export const StyledStatus = styled(Status)`
  span {
    background-color: ${props => {
      switch (props.status) {
        case "paid":
          return props.darkMode ? "#1f2b3f" : "";
        case "pending":
          return props.darkMode ? "2b2736" : "";
        default:
          break;
      }
    }};
  }
  @media (max-width: 700px) {
    position: absolute;
    top: 3rem;
    right: 3rem;
    bottom: none;
    height: 50px;
    z-index: 10000;
  }
  @media (max-width: 475px) {
    &.status--mobile {
      top: -1rem;
      right: 2rem;
    }
    &.status--normal {
      display: none;
    }
  }
`;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  bottom: 3.75rem;
  left: 0;
  z-index: 10;
  padding-left: 6.25rem;
  padding-right: 1rem;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 3.75rem;

  ${ScrollbarStyle}

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 0;
    top: 5rem;
  }

  @media (max-width: 700px) {
    bottom: 5.875rem;
    padding-top: 0;

    left: 1rem;
    right: 1rem;
    width: auto;
  }
  @media (max-width: 450px) {
    bottom: 4rem;
  }
`;

export const GoBack = styled.div`
  position: absolute;
  top: 3.75rem;
  left: 6rem;
  right: 0;
  z-index: 10;
  /* border: 2px dashed red; */
  > div {
    max-width: 1084px;
    /* border: 2px dashed blue; */
    margin: 0 auto;
    width: 87.5%;
    a {
      text-decoration: none;
      font-weight: bold;
      color: ${props => props.theme.colors.black600};

      span {
        color: ${props => (props.darkMode ? "white" : "black")};
      }
      &:visited {
        color: ${props => props.theme.colors.black600};
      }
    }
  }

  .fa-chevron-left {
    color: ${props => props.theme.colors.primary};
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    left: 0;
    top: 6.25rem;
  }
  @media (max-width: 700px) {
    > div {
      margin: 0;
      margin-left: 1rem;
      a {
        padding: 1rem 0;
      }
    }
  }
`;

export const InvoiceActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
  padding: 1.5rem 2rem;
  -webkit-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.5rem;
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black400 : "white"};

  > div:nth-of-type(1) {
    display: flex;

    align-items: center;
  }
  > div:nth-of-type(2) {
    display: flex;
  }
  button {
    margin-left: 0.5rem;
  }
  .status {
    margin-left: 1rem;
  }
  @media (max-width: 700px) {
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    margin-bottom: 0;
  }
  @media (max-width: 450px) {
    padding: 1rem 0;
    button {
      padding: .5rem;
    }
  }
`;

export const InvoiceInfo = styled.div`
  /* border: 3px dashed; */
  padding: 3.25rem;
  -webkit-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.5rem;
  position: relative;
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black400 : "white"};

  > * {
    display: flex;
  }
  span {
    display: block;
    line-height: 1.125rem;
    color: ${props =>
      props.darkMode
        ? props.theme.colors.blueGrayLight
        : props.theme.colors.gray500};
  }
  h2 {
    margin-top: 0.625rem;
    margin-bottom: 0.5rem;
  }
  .invoice-id {
    margin-top: 0;

    span {
      display: inline;
    }
  }
  .info-section-1 {
    justify-content: space-between;
    .sender-address {
      text-align: right;
    }
  }
  .invoice-main {
    margin-top: 1.5rem;
    flex-wrap: wrap;
    div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        margin-bottom: 0;
      }
    }
    div:nth-of-type(1),
    .bill-to {
      margin-right: 4rem;
      margin-bottom: 2rem;
    }
  }
  .payment-due {
    margin-bottom: 2rem;
  }
  .break {
    flex-basis: 100%;
    height: 2rem;
  }
  @media (max-width: 700px) {
    .invoice-id {
      font-size: 0.75rem;
      margin-bottom: 0;
    }

    > div:nth-of-type(1) {
      flex-direction: column;

      .sender-address {
        text-align: left;
        margin-top: 1.5rem;
      }
    }

    > .invoice-main {
      justify-content: space-between;
      div:nth-of-type(1),
      div:nth-of-type(2) {
        margin-right: 0;
        margin-bottom: 0;
      }
    }
  }
  @media (max-width: 475px) {
    padding: 0;
    background: none;
    .invoice-main {
      flex-direction: column;
      margin-top: 0;
      .invoice-date,
      .payment-due,
      .bill-to,
      .client-email {
        margin-top: 2rem;
      }
    }
  }
`;

export const StyledModal = styled(Modal)`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 100000;
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black400 : "white"};
  border-radius: 0.5rem;
  padding: 3.25rem;
  max-width: 480px;

  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.darkMode && "white"};
  }

  p {
    color: ${props =>
      props.darkMode
        ? props.theme.colors.white500
        : props.theme.colors.gray500};
    line-height: 1.375rem;
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    .delete-button {
      margin-left: 0.75rem;
    }
  }
`;
