import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-weight: bold;
  > * {
    flex: 1;
    /* border: 1px dashed; */
  }
  .item-name {
    flex: 2;
  }
  span:nth-of-type(1) {
    text-align: center;
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    text-align: right;
  }
  span:nth-of-type(3) {
    color: black;
  }
`;

export const MobileItem = styled.div`
  display: flex;
  justify-content: space-between;

  .info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .info-right {
    flex: initial;
  }

  > span:nth-of-type(1) {
    text-align: right;
    color: ${props => props.theme.colors.black600};
    flex: initial;
  }
`;
