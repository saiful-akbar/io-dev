import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import typography from "./typography";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[100],
      paper: "#fff",
      dark: grey[800],
    },
    text: {
      primary: grey[800],
      secondary: grey[500],
      tertiary: grey[200],
    },
    primary: {
      main: grey[800],
    },
  },
  typography,
});

export default theme;
