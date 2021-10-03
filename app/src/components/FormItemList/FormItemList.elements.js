import styled from "styled-components";
import { FormInput } from "../shared/FormInput.elements";

export const Container = styled.div`
  /* border: 1px dashed; */
  h2 {
    margin-bottom: 1rem;
    color: #777f98;
  }
  button {
    width: 100%;
  }
  .add-item {
    margin-bottom: 2rem;
  }
`;

export const TableHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: ${props => (props.darkMode ? "white" : props.theme.colors.gray500)};
  span:nth-of-type(1) {
    flex-basis: 214px;
  }
  span:nth-of-type(2) {
    flex-basis: 46px;
  }
  span:nth-of-type(3) {
    flex-basis: 100px;
  }
  span:nth-of-type(4) {
    flex-basis: 100px;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

export const List = styled.ul``;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-name {
    margin-left: 0;
    flex-basis: 214px;
  }
  .quantity {
    flex-basis: 46px;
    text-align: center;
    &__input {
      padding: 0;
      text-align: center;
    }
  }

  .price,
  .info-right {
    flex-basis: 100px;
  }
  .info-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-.75rem);
  }
  input {
    margin-bottom: 0;
    background: ${props => props.darkMode && props.theme.colors.black400};
    border-color: ${props => props.darkMode && props.theme.colors.black300};
    color: ${props => props.darkMode && "white"};
    margin-right: 0;
    flex-basis: 100px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => (props.darkMode ? "white" : props.theme.colors.gray500)};
    height: 50px;
  }
  @media (max-width: 550px) {
    margin-bottom: 0;

    .break {
      height: 0;
    }

    flex-wrap: wrap;
    .form-field {
      position: relative;
      margin-top: 3rem;
      flex: 1;
      &::before {
        position: absolute;
        top: -2rem;
        left: 0;
      }
    }

    .item-name {
      margin-bottom: -1rem;
      &::before {
        content: "Item name";
        position: absolute;
        top: -2rem;
      }
    }

    .quantity::before {
      content: "Qty.";
    }
    .price::before {
      content: "Price";
    }
    .info-right::before {
      content: "Total";
    }
    .quantity,
    .price {
      flex: 1;
      margin-right: 1rem;
    }
    .info-right {
      flex: 2;
      height: 3rem;
      margin-bottom: 1.75rem;
    }
    .quantity__input {
      flex-basis: 4rem;
      text-align: left;
      padding: 0 1.25rem;
    }
    .price__input {
      flex-basis: 6.25rem;
    }
    .quantity__input,
    .price {
      margin-right: 1rem;
    }
    .info-right {
      flex: 1;
    }
  }
  @media (max-width: 400px) {
    .item-name__input,
    .quantity__input,
    .price__input {
      padding: 0.25rem;
    }
    .info-right {
      flex: 1;
    }
  }
`;

export const DeleteItem = styled.span`
  color: ${props => props.theme.colors.gray500};
  font-size: 1.25rem;
  &:hover {
    color: ${props => props.theme.colors.red};
    cursor: pointer;
  }
`;
