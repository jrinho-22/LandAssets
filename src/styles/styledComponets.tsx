import { useTheme } from "@mui/material";
import styled from "styled-components";

export const LowerWrapper = styled.div<{
  customFontSize?: string;
  padding?: any;
}>`
  background-color: ${(props) => {
    return props.customFontSize || useTheme().palette.background.paper;
  }};
  padding: ${(props) => props.padding || "25px"};
  left: 0px;
  position: absolute;
  top: 100%;
  right: 0px;
`;
