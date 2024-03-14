import { TooltipStyled } from "./Tooltip.styled";

const Tooltip = (props: any) => {
  return <TooltipStyled>{props.text}</TooltipStyled>;
};

export default Tooltip;
