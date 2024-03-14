import { Box } from "@mui/material";
import styled, { keyframes } from "styled-components";

export const Container = styled(Box)`
  background-image: url("public/back2.png");
  background-size: cover;
  padding: 2% 11%;
  /* height: 400px; */
  position: relative;
`;

export const WrapperRight = styled.div<{ children?: any }>`
  @media (max-width: 1250px) {
    justify-content: center;
  }
  margin-left: 70px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  a {
    margin: 0 4px;
  }
`;

export const FlatLinkContainer = styled.div<{ ref?: any; children?: any }>`
  position: relative;
`;
interface BorderBottomProps {
  width?: any;
  left?: any;
}

export const animatedProgress = (props: any) => keyframes`
    0% {
      left: ${props.leftOld}%;
      width: ${props.widthOld}px;
      /* left: 400px; */
     }
     30% {
      left: ${props.leftOld}%;
      width: ${props.widthOld}px;
      /* left: 400px; */
     }
     80% {
      left: ${props.left}%;
      width: ${props.width}px;
      /* left: 400px; */
     }
     100% {
      left: ${props.left}%;
      /* display: none; */
      /* width: ${props.width}px; */
     }
`;

export const BorderBottom = styled.div<BorderBottomProps>`
  border-bottom: 3px solid #fff;
  position: relative;
  margin-top: -2px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  transition: left 0.2s ease-in-out;

  /* &.animate {
    animation: ${(props) => animatedProgress(props)} 0.5s forwards;
  } */
`;

export const WrapperLeft = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

export const WrapperMain = styled.div`
  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;
