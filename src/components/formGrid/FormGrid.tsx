import { Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IFormGrid from "../../interfaces/IFormGrid";
import { Button } from "../buttons/Buttons";
import { TextHeader } from "./textHeader/TextHeader";

const FormGrid: React.FC<IFormGrid> = (props: IFormGrid) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formSubmitted, setformSubmitted] = useState(false);

  const submit = () => {
    props.validationUtils!.setTouch && props.validationUtils!.setTouch(true);
    props.validationUtils!.updateValidValue &&
      props.validationUtils!.updateValidValue();
    setformSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted && props.validationUtils!.isValid) {
      if (props.customAction) {
        props.customAction();
      } else {
        props.model!.post(props.record), navigate("/LandAssets/user-menu");
      }
    }
    setformSubmitted(false);
  }, [formSubmitted]);

  const checkDisabled = () => {
    if (props.validationUtils) {
      return props.validationUtils.isValid ? false : true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Grid style={{ ...props.style }} container spacing={3}>
        {props.title && <TextHeader formTitle={true} title={props.title} />}
        {props.children}
      </Grid>
      {props.actionButton && (
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            flexDirection: "row-reverse"
          }}
        >
          <Button
            type="filled"
            disabled={checkDisabled()}
            onClick={() => submit()}
            bg={theme.palette.primary.dark}
            border={theme.palette.primary.main}
          >
            {props.actionButton}
          </Button>
        </div>
      )}
    </>
  );
};

FormGrid.defaultProps = {
  validationUtils: { isValid: true }
};

export const FormRow = (props: any) => {
  return (
    <Grid
      style={{
        marginLeft: "0px",
        ...props.style
      }}
      container
      item
      spacing={3}
    >
      {props.children}
    </Grid>
  );
};

export const FormItem = (props: any) => {
  return (
    <Grid
      style={{
        ...props.style
      }}
      item
      sm={props.col}
    >
      {props.children}
    </Grid>
  );
};

export default FormGrid;
