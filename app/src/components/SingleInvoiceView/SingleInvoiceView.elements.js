import styled from "styled-components";

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

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.white500};
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 3.75rem;
  }
`;

export const GoBack = styled.div`
  position: absolute;
  top: 3.75rem;
  left: 17rem;
  z-index: 10000;
  a {
    text-decoration: none;
    font-weight: bold;
    span {
      color: black;
    }

    &:visited {
      color: ${props => props.theme.colors.black600};
    }
  }
  .fa-chevron-left {
    color: ${props => props.theme.colors.primary};
    margin-right: 1rem;
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
  background-color: white;
  border-radius: 0.5rem;

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
`;

export const InvoiceInfo = styled.div`
  /* border: 3px dashed; */
  padding: 3.25rem;
  background-color: white;
  -webkit-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.5rem;
  > * {
    display: flex;
  }
  span {
    display: block;
    line-height: 1.125rem;
    color: ${props => props.theme.colors.gray500};
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
  > div:nth-of-type(1) {
    justify-content: space-between;
    div:nth-of-type(2) {
      text-align: right;
    }
  }
  > div:nth-of-type(2) {
    margin-top: 1.5rem;
    div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        margin-bottom: 0;
      }
    }
    div:nth-of-type(1),
    div:nth-of-type(2) {
      margin-right: 4rem;
    }
  }
`;
