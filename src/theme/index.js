import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[100],
      paper: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[400],
    },
  },
});

export default theme;
