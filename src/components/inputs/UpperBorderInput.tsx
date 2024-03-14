import { LabelUpperBorder, UpperBorder } from "./StyledUpperBorderInput";

const UpperBorderInput = (props: any) => {
  return (
    <div style={{ marginLeft: "10px" }}>
      <LabelUpperBorder>{props.label}</LabelUpperBorder>
      <UpperBorder placeholder={props.placeholder} />
    </div>
  );
};

export default UpperBorderInput;
