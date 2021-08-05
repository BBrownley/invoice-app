import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  overflow: auto;
  form {
    position: relative;
    margin-bottom: 1rem;
    .form-warning {
      color: red;
      font-size: 0.75rem;
      margin-top: 0.5rem;
      position: absolute;
      bottom: -2rem;
    }
  }
`;

export const BgTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: ${props => props.theme.colors.primary};
  border-bottom-right-radius: 10rem;
`;

export const BgBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: ${props => props.theme.colors.primaryLight};
  border-top-left-radius: 10rem;
`;

export const BgLeftEdge = styled.div`
  height: 10rem;
  width: 10rem;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: -1;
  background-color: ${props => props.theme.colors.primary};
`;

export const BgRightEdge = styled.div`
  height: 10rem;
  width: 10rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-10rem);
  z-index: -1;
  background-color: ${props => props.theme.colors.primaryLight};
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 10rem;
  right: 10rem;
  width: auto;
  height: auto;
  min-height: 600px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    left: 3rem;
    right: 3rem;
  }

  @media (max-width: 550px), (max-height: 650px) {
    left: 0;
    right: 0;
    top: auto;
    transform: none;
  }
`;

export const MainContent = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 600px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  display: flex;
  > * {
    flex: 1;
    padding: 4.5rem;
  }
  h1 {
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.black600};
  }
  h3 {
    color: ${props => props.theme.colors.black500};
    font-weight: 600;
  }
  a {
    color: white;
    text-decoration: none;
    &:visited {
      color: white;
    }
  }
  .use-as-guest {
    width: 100%;
    margin-top: 2rem;
    background-color: ${props => props.theme.colors.primaryLight};
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 2rem;
    > * {
      padding: 0;
    }
  }
  @media (max-width: 550px), (max-height: 650px) {
    min-height: 100vh;
    border-radius: 0;
  }
  @media (max-width: 400px) {
    padding: 1rem;
  }
`;

export const AppInfo = styled.div`
  padding-right: 2.25rem;
  @media (max-width: 1200px) {
    padding: 0;
    text-align: center;
    max-width: 60ch;
    margin: 0 auto;
  }
`;

export const Login = styled.div`
  padding-left: 2.25rem;
  h2 {
    color: black;
  }
  @media (max-width: 1200px) {
    padding: 0;
    margin-top: 2rem;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  color: black;
  label {
    margin-bottom: 1rem;
  }
  &:nth-child(1) {
    margin-bottom: 2rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  > * {
    flex: 1;
    margin-top: 2rem;
  }
  button:nth-of-type(1) {
    margin-right: 1rem;
  }
  button:nth-of-type(2) {
    margin-left: 1rem;
  }
`;
