import styled from "styled-components";

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
`;

export const List = styled.ul``;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  .item-name {
    margin-left: 0;
    flex-basis: 214px;
  }
  .quantity {
    flex-basis: 46px;
    text-align: center;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .price {
    flex-basis: 100px;
  }
  input {
    margin-bottom: 0;
    background: ${props => props.darkMode && props.theme.colors.black400};
    border-color: ${props => props.darkMode && props.theme.colors.black300};
    color: ${props => props.darkMode && "white"};
  }
  div {
    margin-right: 0;
    flex-basis: 100px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => (props.darkMode ? "white" : props.theme.colors.gray500)};
    margin-bottom: 1.5rem;
    height: 50px;
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
