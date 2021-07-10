import React, { useState, useEffect } from "react";
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

  const [formWarning, setFormWarning] = useState(null);

  const history = useHistory();

  // Clear form warnings on input or form change
  useEffect(() => {
    setFormWarning(null);
  }, [
    username,
    password,
    newUsername,
    newEmail,
    newPassword,
    pwConfirm,
    registering
  ]);

  const register = async () => {
    // Check that all fields are filled in
    if (
      newUsername.trim().length === 0 ||
      newEmail.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      pwConfirm.trim().length === 0
    ) {
      return setFormWarning("All fields must be filled");
    }

    // new password matches confirm pw
    if (newPassword !== pwConfirm) {
      return setFormWarning("Passwords do not match");
    }

    // Attempt to create account
    const registration = await usersService.register({
      newUsername,
      newEmail,
      newPassword,
      pwConfirm
    });

    // Errors returned from the server (usually a username or email already in use)
    if (registration?.error) {
      return setFormWarning(registration.error);
    }

    history.push("/invoices");
  };

  const login = async () => {
    // Check that both fields are filled in
    if (username.trim().length === 0 || password.trim().length === 0) {
      return setFormWarning("Both fields must be filled");
    }

    // Validate username and password
    const userLogin = await usersService.login(username, password);

    // Errors returned from the server (usually invalid username/pw)
    if (userLogin?.error) {
      return setFormWarning(userLogin.error);
    }

    localStorage.setItem("username", username.trim());
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
                  <span className="form-warning">{formWarning}</span>
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
                  <span className="form-warning">{formWarning}</span>
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
