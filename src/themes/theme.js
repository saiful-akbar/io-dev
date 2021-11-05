import { createTheme } from "@mui/material/styles";
import typography from "./typography";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
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
});

export default theme;
