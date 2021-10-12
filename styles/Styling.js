import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";
export const Font = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

  font-family: "Press Start 2P", cursive;
`;

export const LogoFont = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Monoton&display=swap");

  font-family: "Monoton", cursive;
`;

export const Container_Content = styled.div`
  background: ${({ bg }) => (bg ? "white" : "black")};
  height: 100%;s
  width: 100vw;
  text-align: center;
  text-justify: center;
`;

export const Team_P = styled.p`
  text-align: start;
  font-size: 12px;
`;

export const Team_Header = styled.h1`
  font-family: "Press Start 2P";
  margin-bottom:50px;
`;

export const Font_Footer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
  font-family: "Press Start 2P", cursive;
  color: white;
  height:100%;
  width: 100%;
  padding-top: 100px;
  text-align: center;
`;

export const Bidding_Header = styled.h1`
  color:${({ colorchange}) => (colorchange ? "red" : 'yellow')};
  font-family: 'Press Start 2P', cursive;
  text-align: center;
`