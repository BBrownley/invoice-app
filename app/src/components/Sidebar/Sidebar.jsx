import React from "react";
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
          <ProfilePicture></ProfilePicture>
        </ProfilePictureContainer>
      </div>
    </Container>
  );
}
