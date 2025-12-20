// src/theme.ts

import { createTheme } from "@mui/material";

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
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
        select: {
          minHeight: '1.2em',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '1px 1px 1px #aaa',
        },
        notchedOutline: {
          border: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
      variants: [
        {
          props: { variant: 'custom' },
          style: {
            backgroundColor: '#7b1fa2',
            color: 'white',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#9c4dcc',
            },
          },
        },
      ],
    },
  },
});