import styled from "styled-components";

import logo from "../../assets/logo.svg";

import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";

import avatar from "../../assets/image-avatar.jpg";

const breakpoints = {
  tablet: "768px"
};

export const Sidebar = styled.div`
  height: 100vh;
  width: 100px;
  background-color: ${props => props.theme.colors.gray400};
  display: flex;
  flex-direction: column;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  justify-content: space-between;
  position: relative;
  z-index: 20;
  @media (max-width: ${breakpoints.tablet}) {
    height: 80px;
    width: 100vw;
    flex-direction: row;
    border-radius: 0;
    > div:nth-child(2) {
      width: 180px;
      display: flex;
      /* > * {
        flex: 1;
      } */
    }
  }
`;

export const Branding = styled.div`
  height: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primary};
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${breakpoints.tablet}) {
    /* flex-direction: row; */
    width: 80px;
    height: 80px;
  }
`;

export const Logo = styled.div`
  background: url(${logo});
  height: 39px;
  width: 42px;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${breakpoints.tablet}) {
    height: 31px;
    width: 34px;
  }
`;

export const BgTop = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.primary};
  border-top-right-radius: 1rem;
`;

export const BgBot = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryLight};
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export const ToggleContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoints.tablet}) {
    height: 80px;
    flex-basis: 80px;
  }
`;

export const NightToggle = styled.div`
  background: url(${moon});
  height: 20px;
  width: 20px;
  background-size: cover;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

export const DayToggle = styled.div`
  background: url(${sun});
  height: 20px;
  width: 20px;
  background-size: cover;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

// export const ProfilePictureContainer = styled.div`
//   position: relative;
//   height: 100px;
//   border-top: 1px solid ${props => props.theme.colors.blueGray};
//   @media (max-width: ${breakpoints.tablet}) {
//     height: 80px;
//     flex-basis: 100px;
//     border: none;
//     border-left: 1px solid ${props => props.theme.colors.blueGray};
//   }
// `;

// export const ProfilePicture = styled.div`
//   height: 40px;
//   width: 40px;
//   background: url(${avatar});
//   background-size: cover;
//   border-radius: 40px;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// `;

export const LoginInfo = styled.div`
  position: relative;
  height: 100px;
  border-top: 1px solid ${props => props.theme.colors.blueGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    text-align: center;
    margin: 0;
  }
  .username {
    color: #858bb2;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
  }
  .logout {
    margin-top: 0.5rem;
    color: white;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @media (max-width: 768px) {
    border-top: none;
    height: auto;
    width: 100px;
  }
`;
