import React, { useState, useEffect } from "react";
import usersService from "../../services/users";

import { useHistory } from "react-router-dom";
import { removeStoredToken } from "../../services/tokenUtil";

import { useDarkMode, useDarkModeUpdate } from "../../darkModeContext";

import logo from "../../assets/logo.svg";
import {
  Sidebar as Container,
  Branding,
  Logo,
  BgTop,
  BgBot,
  ToggleContainer,
  DayToggle,
  NightToggle,
  ProfilePictureContainer,
  ProfilePicture,
  LoginInfo
} from "./Sidebar.elements";

export default function Sidebar() {
  const history = useHistory();
  const setDarkMode = useDarkModeUpdate();

  const [darkModeEnabled, setDarkModeEnabled] = useState(useDarkMode());
  const [whosLoggedIn, setWhosLoggedIn] = useState(
    localStorage.getItem("username") || "Guest"
  );

  const logout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("username");
    removeStoredToken();
    history.push("/");
  };

  const handleToggleDarkMode = async () => {
    setDarkMode(!darkModeEnabled);
    setDarkModeEnabled(prevState => !prevState);
    await usersService.toggleDarkModePref();
  };

  useEffect(() => {
    const getDarkModePref = async () => {
      const darkModePref = await usersService.getDarkModePref();
      setDarkModeEnabled(darkModePref);
    };

    const getUsername = async () => {
      const username = await usersService.getDarkModePref();
      setWhosLoggedIn(username);
    };

    getDarkModePref();
  }, []);

  return (
    <Container>
      <div>
        <Branding>
          <BgTop></BgTop>
          <BgBot></BgBot>
          <Logo></Logo>
        </Branding>
      </div>
      <div>
        <ToggleContainer onClick={handleToggleDarkMode}>
          {darkModeEnabled ? (
            <DayToggle></DayToggle>
          ) : (
            <NightToggle></NightToggle>
          )}
        </ToggleContainer>

        {/* Need to add support for user-determined profile pictures */}
        {/* <ProfilePictureContainer>
          <ProfilePicture onClick={logout}></ProfilePicture>
        </ProfilePictureContainer> */}
        <LoginInfo>
          <p className="username">{whosLoggedIn}</p>
          <a onClick={logout} className="logout">
            Logout
          </a>
        </LoginInfo>
      </div>
    </Container>
  );
}
