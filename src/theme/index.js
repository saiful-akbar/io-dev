import { createTheme } from '@mui/material/styles';
import typography from './typography';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f7f7f7',
      paper: '#fff',
    },
    text: {
      primary: 'rgb(66, 66, 66)',
      secondary: 'rgba(66, 66, 66, 0.3)',
      disabled: 'rgba(66, 66, 66, 0.2)',
      lightPrimary: 'rgb(255, 255, 255)',
      lightSecondary: 'rgba(255, 255, 255, 0.6)',
      lightDisabled: 'rgba(255, 255, 255, 0.4)',
    },
    primary: {
      main: 'rgb(66, 66, 66)',
    },
  },
  typography,
});

export default theme;
