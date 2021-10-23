import { createTheme } from '@mui/material/styles';
import typography from './typography';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#424242',
      secondary: '#bdbdbd',
    },
    primary: {
      main: '#424242',
    },
  },
  typography,
});

export default theme;
