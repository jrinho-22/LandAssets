import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./styles/CustomizingTheme";
import "./main.scss";
import { Provider } from "react-redux";
import instance from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Provider store={instance.storeConfig}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
