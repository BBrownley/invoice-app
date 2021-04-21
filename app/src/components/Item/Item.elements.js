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
  h3 {
    flex: 2;
  }
  span:nth-of-type(1) {
    text-align: center;
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    text-align: right;
  }
  span:nth-of-type(3)  {
    color: black;
  }
`;
