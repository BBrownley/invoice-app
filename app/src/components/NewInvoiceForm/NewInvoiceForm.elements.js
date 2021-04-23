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
  overflow: scroll;
  ${ScrollbarStyle}

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

export const Wrapper = styled.div`
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
