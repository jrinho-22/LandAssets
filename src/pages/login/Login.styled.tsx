import styled from "styled-components";
import { Box, useTheme } from "@mui/material";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${() => useTheme().palette.background.paper};
`;

export const Container = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 30px;
  box-sizing: border-box;
  max-height: 950px;
  min-height: 60%;
  height: fit-content;
  max-height: 750px;
  overflow: auto;
  width: 400px;
`;
