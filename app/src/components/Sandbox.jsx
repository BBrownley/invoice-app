import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FormInput } from "./shared/FormInput.elements";
import { Button } from "./shared/Button.elements";

import usersService from "../services/users";

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  overflow: auto;
`;

const BgTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: ${props => props.theme.colors.primary};
  border-bottom-right-radius: 10rem;
`;

const BgBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: ${props => props.theme.colors.primaryLight};
  border-top-left-radius: 10rem;
`;

const BgLeftEdge = styled.div`
  height: 10rem;
  width: 10rem;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: -1;
  background-color: ${props => props.theme.colors.primary};
`;

const BgRightEdge = styled.div`
  height: 10rem;
  width: 10rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-10rem);
  z-index: -1;
  background-color: ${props => props.theme.colors.primaryLight};
`;

const Wrapper = styled.div`
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
`;

const MainContent = styled.div`
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
`;

const AppInfo = styled.div`
  /* border: 2px dashed blue; */
  /* padding-right: 1rem; */
  padding-right: 2.25rem;
  @media (max-width: 1200px) {
    padding: 0;
    text-align: center;
    max-width: 60ch;
    margin: 0 auto;
  }
`;

const Login = styled.div`
  /* border: 2px dashed; */
  /* color: ${props => props.theme.colors.primary}; */
  /* padding-left: 1rem; */
  padding-left: 2.25rem;
  @media (max-width: 1200px) {
    padding: 0;
    margin-top: 2rem;
  }
  h2 {
   
  }
`;

const FormField = styled.div`
  /* border: 2px dashed; */
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  label {
    margin-bottom: 1rem;
  }
  &:nth-child(1) {
    margin-bottom: 2rem;
  }
`;

const Buttons = styled.div`
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

export default function Sandbox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [registering, setRegistering] = useState(false);

  const register = () => {
    usersService.register({ newUsername, newEmail, newPassword, pwConfirm });
  };

  const login = () => {
    usersService.login(username, password);
  };

  return (
    <Container>
      <BgTop></BgTop>
      <BgBottom></BgBottom>
      <BgLeftEdge></BgLeftEdge>
      <BgRightEdge></BgRightEdge>
      <Wrapper>
        <MainContent>
          <AppInfo>
            <h1>Invoicing Made Easy</h1>
            <h3>
              Save time by organizing your business workflow with this free
              invoicing app. Start today!
            </h3>
          </AppInfo>
          <Login>
            {registering === false && (
              <>
                <h2>Login</h2>

                <form>
                  <FormField>
                    <label htmlFor="username">Username</label>
                    <FormInput
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="password">Password</label>
                    <FormInput
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormField>
                </form>

                <Buttons>
                  <Button onClick={() => login()}>Log in</Button>
                  <Button color="white" onClick={() => setRegistering(true)}>
                    Sign up
                  </Button>
                </Buttons>
                <Link to="/">
                  <Button className="use-as-guest">Use as guest</Button>
                </Link>
              </>
            )}
            {registering && (
              <>
                <h2>Register</h2>
                <form>
                  <FormField>
                    <label htmlFor="new-username">Username</label>
                    <FormInput
                      type="text"
                      id="new-username"
                      name="new-username"
                      value={newUsername}
                      onChange={e => setNewUsername(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="new-email">Email</label>
                    <FormInput
                      type="new-email"
                      id="new-email"
                      name="new-email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="new-password">Password</label>
                    <FormInput
                      type="password"
                      id="new-password"
                      name="new-password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <label htmlFor="pw-confirm">Confirm Password</label>
                    <FormInput
                      type="password"
                      id="pw-confirm"
                      name="pw-confirm"
                      value={pwConfirm}
                      onChange={e => setPwConfirm(e.target.value)}
                    />
                  </FormField>
                </form>

                <Buttons>
                  <Button onClick={() => register()}>Create account</Button>
                  <Button color="white" onClick={() => setRegistering(false)}>
                    Cancel
                  </Button>
                </Buttons>
              </>
            )}
          </Login>
        </MainContent>
      </Wrapper>
    </Container>
  );
}
