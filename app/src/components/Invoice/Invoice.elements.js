import styled, { css } from "styled-components";

export const Container = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  height: 72px;
  background-color: white;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  padding-left: 2rem;
  padding-right: 3rem;
  -webkit-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.03);
  color: ${props => props.theme.colors.gray500};
  > * {
    align-self: center;
    padding-right: 1rem;
  }
  .fa-chevron-right {
    position: absolute;
    right: 1.5rem;
    padding-right: 0;
    color: ${props => props.theme.colors.primary};
  }
  @media (max-width: 700px) {
    height: 144px;
    .fa-chevron-right {
      display: none;
    }
    > * {
      padding-right: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

export const InvoiceId = styled.div`
  /* border: 1px dashed red; */
  color: ${props => props.theme.colors.black600};
  font-weight: bold;
  width: 80px;
  @media (max-width: 700px) {
    position: absolute;
    left: 15px;
    top: 25px;
  }
`;

export const PaymentDue = styled.div`
  /* border: 1px dashed blue; */
  flex: 1;
  padding-left: 2rem;
  @media (max-width: 700px) {
    position: absolute;
    left: 25px;
    bottom: 62px;
    padding-left: 0;
  }
`;

export const Name = styled.div`
  /* border: 1px dashed red; */
  flex: 1;
  @media (max-width: 700px) {
    position: absolute;
    right: 25px;
    top: 25px;
  }
`;

export const Total = styled.h3`
  /* border: 1px dashed blue; */
  color: ${props => props.theme.colors.black600};
  text-align: right;
  flex: 1;
  padding-right: 2.5rem;
  @media (max-width: 700px) {
    position: absolute;
    left: 25px;
    bottom: 25px;
  }
`;

export const Status = styled.div`
  /* border: 1px dashed red; */
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10000;
  span {
    background-color: #302759;
    width: 104px;
    height: 40px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    .fa-circle {
      margin-right: 8px;
    }

    ${props => {
      switch (props.status) {
        case "paid":
          return css`
            background-color: #f3fdfa;
            color: #33d69f;
          `;
          break;
        case "pending":
          return css`
            background-color: #fff9f0;
            color: #ff9f00;
          `;
          break;
        case "draft":
          return css`
            background-color: #f4f4f5;
            color: #373b53;
          `;
          break;
        default:
          break;
      }
    }}
  }

  @media (max-width: 700px) {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }
`;
