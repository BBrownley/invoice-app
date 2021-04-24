import styled from "styled-components";
import ScrollbarStyle from "../shared/mixins/Scrollbar.elements";

export const Container = styled.div`
  position: absolute;
  left: 100px;
  top: 0;
  bottom: 0;
  width: 615px;
  background-color: white;
  padding: 3.5rem;
  padding-bottom: 6rem;
  padding-right: 2.25rem;
  border-bottom-right-radius: 1.25rem;
  border-top-right-radius: 1.25rem;

  h4 {
    color: ${props => props.theme.colors.primary};
    margin-top: 3.5rem;
    margin-bottom: 2rem;
  }

  label {
    color: ${props => props.theme.colors.gray500};
    font-weight: normal;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

export const DarkBkg = styled.div`
  height: 100vw;
  width: 100vw;
  content: " ";
  background: black;
  position: absolute;
  top: 0;
  right: -100vw;
  z-index: 10;
  opacity: .5;
`;

export const Wrapper = styled.div`
  overflow: scroll;
  height: 100%;
  padding-right: 1.25rem;

  ${ScrollbarStyle}
  .form-row {
    display: flex;
    .select-wrapper {
      width: 100%;
    }
  }
  form > div {
    > div {
      margin: 0 0.75rem;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
`;

export const FormOptions = styled.div`
  position: fixed;
  bottom: 0;
  left: 100px;
  width: 615px;
  display: flex;
  justify-content: space-between;
  padding: 2rem 3.5rem;
  background: white;
  -webkit-box-shadow: -2px -25px 20px 0px rgba(0, 0, 0, 0.07);
  box-shadow: -2px -25px 20px 0px rgba(0, 0, 0, 0.07);
  border-top-right-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  .btns-right {
    display: flex;
    .save-as {
      margin-right: 1rem;
    }
  }
`;
