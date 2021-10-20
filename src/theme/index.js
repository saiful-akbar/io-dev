import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import typography from './typography';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[100],
      dark: grey[800],
      paper: '#fff',
    },
    text: {
      primary: grey[800],
      secondary: grey[300],
    },
  },
  typography,
});

export default theme;
