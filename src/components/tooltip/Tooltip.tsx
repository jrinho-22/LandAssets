import React, { useEffect, useState } from "react";
import { TooltipStyled } from "./Tooltip.styled";

const Tooltip = (props) => {
  return <TooltipStyled>{props.text}</TooltipStyled>;
};

export default Tooltip;
