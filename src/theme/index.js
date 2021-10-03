import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import typography from "./typography";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[100],
      paper: "#fff",
    },
    text: {
      primary: grey[800],
      secondary: grey[400],
      tertiary: grey[50],
    },
    primary: {
      main: grey[800],
    },
  },
  typography,
});

export default theme;
