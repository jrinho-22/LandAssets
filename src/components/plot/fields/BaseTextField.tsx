import { TextField } from "@mui/material";

const BaseTextField = (props: any) => {
  return (
    <TextField
      {...props}
      fullWidth
      focused
      color="secondary"
      variant="standard"
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "22px",
          ".Mui-disabled": {
            color: (theme) => theme.palette.secondary.main
          }
        },
        mt: "12px"
      }}
      disabled
    />
  );
};

export default BaseTextField;
