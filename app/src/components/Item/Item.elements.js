import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-weight: bold;

  > * {
    flex: 1;
  }
  .item-name {
    flex: 2;
  }
  .item-quantity {
    text-align: center;
  }
  .item-price,
  .item-total {
    text-align: right;
  }
  .item-total {
    color: ${props => (props.darkMode ? "white" : "black")};
  }
`;

export const MobileItem = styled.div`
  display: flex;
  justify-content: space-between;

  .item-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .item-total {
    flex: initial;
  }
`;
