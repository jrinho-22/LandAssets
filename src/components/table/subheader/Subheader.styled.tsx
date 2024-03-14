import { useTheme } from "@mui/material";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ActionsWrapper = styled.div`
  button {
    all: unset;
    border-radius: 3px;
    padding: 2px 22px 0px;
    margin: 0 3px;
    cursor: pointer;
    background-color: ${() => {
      return useTheme().palette.background.paper;
    }};
    color: gray;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.65; /* Reduce opacity to visually indicate it's disabled */
    }
  }
  button:last-child {
    color: #efefef;
    background-color: ${() => {
      return useTheme().palette.secondary.light;
    }};
  }
`;
