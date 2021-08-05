import React, { useState, useEffect } from "react";
import usersService from "../../services/users";

import { useHistory, Link } from "react-router-dom";
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
  const setDarkModeContext = useDarkModeUpdate();

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
    setDarkModeContext(!darkModeEnabled);
    setDarkModeEnabled(prevState => !prevState);

    if (localStorage.getItem("username") === null) {
      const prevGuestDarkMode = eval(localStorage.getItem("guestDarkMode"));
      localStorage.setItem("guestDarkMode", !prevGuestDarkMode);
    } else {
      await usersService.toggleDarkModePref();
    }
  };

  useEffect(() => {
    const getDarkModePref = async () => {
      let darkModePref;

      if (localStorage.getItem("username") === null) {
        darkModePref = eval(localStorage.getItem("guestDarkMode"));
      } else {
        darkModePref = await usersService.getDarkModePref();
      }

      setDarkModeContext(darkModePref);
      setDarkModeEnabled(darkModePref);
    };

    getDarkModePref();
  }, []);

  return (
    <Container>
      <div>
        <Link to="/invoices">
          <Branding>
            <BgTop></BgTop>
            <BgBot></BgBot>
            <Logo></Logo>
          </Branding>
        </Link>
      </div>
      <div>
        <ToggleContainer>
          {darkModeEnabled ? (
            <DayToggle onClick={handleToggleDarkMode}></DayToggle>
          ) : (
            <NightToggle onClick={handleToggleDarkMode}></NightToggle>
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
