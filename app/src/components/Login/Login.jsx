import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FormInput } from "../shared/FormInput.elements";
import { Button } from "../shared/Button.elements";

import usersService from "../../services/users";
import invoiceService from "../../services/invoices";

import {
  Container,
  BgTop,
  BgBottom,
  BgLeftEdge,
  BgRightEdge,
  Wrapper,
  MainContent,
  AppInfo,
  Login,
  FormField,
  Buttons
} from "./Login.elements";

export default function Sandbox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [registering, setRegistering] = useState(false);

  const history = useHistory();

  const register = () => {
    usersService.register({ newUsername, newEmail, newPassword, pwConfirm });
  };

  const login = async () => {
    await usersService.login(username, password);
    
    history.push("/invoices");
  };

  const continueAsGuest = async () => {
    
    history.push("/invoices");
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
                <Link to="/invoices">
                  <Button className="use-as-guest" onClick={continueAsGuest}>
                    Use as guest
                  </Button>
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
