// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#e9ebf3ff',
      paper: '#ffffff',
    },
  },
  typography: {
    // fontFamily: 'Roboto, Arial, sans-serif',
    body1: {
        color: '#333333'
    },
    body2: {
        color: '#333333'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: '1.2em'
        }
      }
    },
  }
});