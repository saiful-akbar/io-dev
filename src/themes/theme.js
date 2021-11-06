import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import shadows from "./shadows";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f4f4",
      paper: "#fff",
    },
    text: {
      primary: "#424242",
      secondary: "#8e8e99",
      disabled: "rgba(66, 66, 66, 0.2)",
      lightPrimary: "rgb(255, 255, 255)",
      lightSecondary: "rgba(255, 255, 255, 0.6)",
      lightDisabled: "rgba(255, 255, 255, 0.4)",
    },
    primary: {
      main: "rgb(66, 66, 66)",
    },
  },
  typography,
  shadows,
});

export default theme;
