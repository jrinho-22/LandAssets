import { useEffect, useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import {
  ButtonFilledStyled,
  ButtonUnfilledStyled,
  ToolTipBox
} from "./Buttons.styled";

export const Button = (props: any) => {
  const [invalidTootip, setinvalidTootip] = useState({
    case: false,
    text: ""
  });
  useEffect(() => {
    if (props.tooltip?.length) {
      const invalidTootipInstance = props.tooltip.find(
        (v: any) => v.case == true
      );
      setinvalidTootip(invalidTootipInstance);
    }
  }, [props.tooltip]);
  return (
    <ToolTipBox style={{ display: "inline-flex", position: "relative" }}>
      {props.tooltip && invalidTootip?.text && (
        <Tooltip text={invalidTootip.text} />
      )}
      {props.type == "filled" && (
        <ButtonFilledStyled
          size={props.size}
          disabled={props.disabled}
          onClick={props.onClick}
          style={props.style}
          bg={props.bg}
          border={props.border}
        >
          {props.children}
        </ButtonFilledStyled>
      )}
      {props.type == "unfilled" && (
        <ButtonUnfilledStyled disabled={props.disabled} onClick={props.onClick}>
          {props.children}
        </ButtonUnfilledStyled>
      )}
    </ToolTipBox>
  );
};
