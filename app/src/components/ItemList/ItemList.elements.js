import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  > * {
    padding: 3rem;
  }
  @media (max-width: 700px) {
    > * {
      padding: 1.5rem;
    }
  }
`;

export const ListWrapper = styled.div`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black300 : "#f5f5f5"};
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > * {
      flex: 1;
      color: ${props =>
        props.darkMode
          ? props.theme.colors.blueGrayLight
          : props.theme.colors.gray500};
    }
    span:nth-of-type(1) {
      flex: 2;
    }
    span:nth-of-type(2) {
      text-align: center;
    }
    span:nth-of-type(3),
    span:nth-of-type(4) {
      text-align: right;
    }
  }
  @media (max-width: 700px) {
    padding-top: 0;
    > div:nth-of-type(1) {
      display: none;
    }
  }
`;

export const Total = styled.div`
  background-color: ${props =>
    props.darkMode ? props.theme.colors.black600 : props.theme.colors.gray400};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  .amt-due {
    color: white;
  }
  @media (max-width: 450px) {
    h2 {
      font-size: 0.75rem;
    }
  }
`;

export const List = styled.ul``;
