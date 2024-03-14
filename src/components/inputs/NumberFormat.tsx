import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const NumericFormatCustom = React.forwardRef<NumericFormatProps, any>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({ target: { value: Number(values.value) } });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

export default NumericFormatCustom;
