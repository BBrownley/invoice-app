import { css } from "styled-components";

const sharedStyle = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.white500};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.blueGrayLight};
  }
`;

export default sharedStyle;
