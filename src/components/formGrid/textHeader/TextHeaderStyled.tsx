import { useTheme } from "@mui/material";
import styled from "styled-components";

export const StyledBorder = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;

  span {
    padding-right: 20px;
    border-bottom: 3px solid ${() => useTheme().palette.secondary.main};
    font-family: Averta;
    font-weight: 600;
    padding-bottom: 4px;
    display: inline-block;
  }
`;
