import { Typography, TypographyProps } from "@mui/material";
import styled from "styled-components";

export const Img = styled.img`
  @media (max-width: 1200px) {
    display: none;
  }
  height: 330px;
  z-index: 1;
  position: absolute;
  bottom: 40px; /* Adjust the top distance as needed */
  right: 0; /* Adjust the left distance as needed */
  /* Additional styling properties */
`;

export const UpperWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const Description = styled.div`
  margin-top: 15px;
  z-index: 2;
  position: relative;
  height: 250px;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const InfoBar = styled.div`
  background-color: white;
  border-radius: 9px;
  display: flex;
  position: relative;
  z-index: 2;
  padding: 10px 0px 15px;
  justify-content: space-around;
  margin-top: 70px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

interface TypoItemProps extends TypographyProps {
  fontSize?: string;
  fontWeight?: string;
}

export const TypoItem = styled(Typography)<TypoItemProps>`
  color: #0f8f4e;
  font-size: ${(props) => props.fontSize || "20px"} !important;
  font-weight: ${(props) => props.fontWeight || "100"} !important;
`;
