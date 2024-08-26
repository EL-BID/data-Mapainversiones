"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a7691",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: { textTransform: "none" },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default theme;
