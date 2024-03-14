import Typography from "@mui/material/Typography";
import React from "react";
import { FormItem, FormRow } from "../FormGrid";
import { StyledBorder } from "./TextHeaderStyled";

interface ITextHeader {
  title: string;
  formTitle?: boolean;
}

export const TextHeader: React.FC<ITextHeader> = (props: ITextHeader) => {
  TextHeader.defaultProps = {
    title: "",
    formTitle: false
  };
  return (
    <FormRow>
      <FormItem col="12">
        <StyledBorder
          style={{
            fontSize: props.formTitle ? "26px" : "20px",
            marginLeft: props.formTitle ? "-15px" : undefined
          }}
        >
          <span>{props.title}</span>
        </StyledBorder>
      </FormItem>
    </FormRow>
  );
};
