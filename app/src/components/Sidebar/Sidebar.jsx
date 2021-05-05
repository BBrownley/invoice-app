import React from "react";
import { useHistory } from "react-router-dom";
import { ejectTokenInterceptor } from "../../services/tokenUtil";

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

  const logout = () => {
    localStorage.removeItem("loggedUser");
    ejectTokenInterceptor();
    history.push("/");
  };

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
        <ToggleContainer>
          <NightToggle></NightToggle>
        </ToggleContainer>

        <ProfilePictureContainer>
          <ProfilePicture onClick={logout}></ProfilePicture>
        </ProfilePictureContainer>
      </div>
    </Container>
  );
}
