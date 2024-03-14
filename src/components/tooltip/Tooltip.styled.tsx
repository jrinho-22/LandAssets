import styled from "styled-components";

export const TooltipStyled = styled.span`
  z-index: 999;
  width: max-content;
  position: absolute;
  bottom: -40px;
  left: 50%;
  translate: -50%;
  transform: scale(0);
  transition: transform 0.4s ease-in-out;
  transform-origin: top center;
  background-color: #333;
  padding: 3px 12px 5px 12px;
  color: white;
  border-radius: 3px;
  font-size: small;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% -100%;
    border: 8px solid transparent;
    border-bottom-color: #333;
  }
`;
