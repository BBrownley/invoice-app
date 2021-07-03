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
  NightToggle,
  ProfilePictureContainer,
  ProfilePicture
} from "./Sidebar.elements";

export default function Sidebar() {
  const history = useHistory();
  const setDarkMode = useDarkModeUpdate();

  const [darkModeEnabled, setDarkModeEnabled] = useState(useDarkMode());

  console.log(useDarkMode());

  const logout = () => {
    localStorage.removeItem("loggedUser");
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

      if (darkModePref) {
        console.log("Dark mode is enabled");
      } else {
        console.log("Dark mode is off");
      }

      setDarkModeEnabled(darkModePref);
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
          <NightToggle></NightToggle>
        </ToggleContainer>

        <ProfilePictureContainer>
          <ProfilePicture onClick={logout}></ProfilePicture>
        </ProfilePictureContainer>
      </div>
    </Container>
  );
}
