import { Button, useTheme } from "@mui/material";
import styled from "styled-components";

export const FlatLink = styled.button`
  all: unset;
  font-family: averta;
  font-size: 17px;
  background-color: transparent;
  padding: 8px 14px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: white;
  transition: color 0.2s ease-in-out;
  transition: border-bottom 0s ease-in-out;

  /* &.border {
    border-bottom: 2px solid white;
    transition-delay: 0.4s // tempo q demora para recomeçar transtion
  } */

  &:hover {
    color: ${() => useTheme().palette.secondary.main};
  }

  &.active {
    color: ${() => useTheme().palette.secondary.main};
  }
`;

export const ButtonUnfilledStyled = styled.button`
  background-color: transparent;
  padding: 16px 18px;
  cursor: pointer;
  border-radius: 4px;
  width: max-content;
  border: 1px solid ${() => useTheme().palette.secondary.main};
  color: white;
  margin: 0 7px;
  box-sizing: border-box;

  &:hover {
    border-color: white;
  }

  &:disabled {
    cursor: default;
    opacity: 0.65;
    pointer-events: none;
  }
`;

export const ToolTipBox = styled.div`
  &:hover {
    span {
      transform: scale(1);
    }
  }
`;

export const ButtonFilledStyled = styled(Button)<{
  bg?: string;
  border?: string;
  size?: string;
}>`
  margin: 0px 7px !important;
  width: max-content;
  color: white !important;
  height: ${(props) => (props.size == "small" ? "28px" : "40px")};
  padding: 0 15px !important;
  background-color: ${(props) => {
    return props.bg
      ? `${props.bg}!important`
      : `${useTheme().palette.secondary.dark}!important`;
  }};

  &:disabled {
    opacity: 0.65;
  }
`;
