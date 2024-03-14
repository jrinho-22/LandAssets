import { createTheme } from "@mui/material/styles";
import { Color } from "../utils/Color";

const theme = createTheme({
  palette: {
    primary: Color.primary,
    secondary: Color.secondary,
    // text: Color.text,
    // error: Color.error,
    // success: Color.success,
    // common: '#32b14d',
    background: Color.background
  },

  typography: {
    fontFamily: [
      "sans-serif",
      "Averta",
      "Roboto",
      "Roboto Medium",
      "Inter Medium"
    ].join(","),
    h3: { fontSize: "43px", fontWeight: "800", fontFamily: "Averta" },
    h4: { fontSize: "30px", fontWeight: "800", fontFamily: "Averta" },
    h6: { fontSize: "15px", fontFamily: "Averta" }
  }
  // components: {
  //   MuiCheckbox: {
  //     styleOverrides: {
  //       root:{
  //         color: 'red'
  //       }
  //     }
  // }
  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     root: {
  //       borderRadius: 90
  //     }
  //   }
  // },
  //   MuiTextField: {
  //     defaultProps: {
  //       size: 'small'
  //     }
  //   },
  //   MuiSelect: {
  //     defaultProps: {
  //       size: 'small'
  //     }
  //   },
  //   MuiFormControl: {
  //     defaultProps: {
  //       size: 'small'
  //     }
  //   },
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {}
  //     }
  //   }
  // }
});

export default theme;
