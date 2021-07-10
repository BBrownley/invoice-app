import styled from "styled-components";
import imgEmpty from "../../assets/illustration-empty.svg";

export const Container = styled.div`
  text-align: center;
`;

export const EmptyWarning = styled.div`
  width: 240px;
  margin: 63px auto 0 auto;
  color: ${props =>
    props.darkMode ? props.theme.colors.white500 : props.theme.colors.gray500};
  p {
    margin-top: 1.75rem;
    strong {
      font-weight: bold;
    }
  }
  h2 {
    color: ${props =>
      props.darkMode
        ? props.theme.colors.white600
        : props.theme.colors.black600};
  }
`;

export const EmptyImg = styled.div`
  background-image: url(${imgEmpty});
  background-size: cover;
  height: 198px;
  margin-bottom: 70px;
`;
