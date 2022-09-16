import { createTheme } from "@mui/material/styles"

export const light = createTheme({
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 1.27
    },
    h2: {
      fontSize: 24,
      fontWeight: 600
    },
    h3: {
      fontSize: 18,
      fontWeight: 500
    },
    h4: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 1.5
    },
    h5: {
      fontSize: 14,
      fontWeight: 300
    },
    h6: {
      fontSize: 12,
      fontWeight: 500
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      textTransform: "none"
    }
    p: {
      fontSize: 14,
      fontWeight: 300,
      textTransform: "none"
    },
  },
  palette: {
    primary: {
      main: '#7f56d9',
      light: '#f9f5ff',
      dark: '#6941c6'
    },
    secondary: {
      main: '#FFFFFF',
      light: '#EAECF0'
    },
    warning: {
      main: '#344054',
      light: '#F9FAFB', // modal background light
      dark: '#EAECF0' // modal inner background light
    },
    error: {
      main: '#d92d20',
      light: '#fff1f3',
      dark: '#c01048'
    },
    success: {
      main: '#32D583',
      light: '#A6F4C5',
      dark: '#3CCB7F'
    },
    info: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF'
    },
    background: {
      default: '#D0D5DD',
      paper: '#EAECF0'
    },
    common: {
      black: '#101828',
      white: '#FFFFFF'
    },
    text: {
      primary: '#667085',
    },

    divider: '#D0D5DD'
  }
})

export const dark = createTheme({
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 1.27
    },
    h2: {
      fontSize: 24,
      fontWeight: 600
    },
    h3: {
      fontSize: 18,
      fontWeight: 500
    },
    h4: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 1.5
    },
    h5: {
      fontSize: 14,
      fontWeight: 300
    },
    h6: {
      fontSize: 12,
      fontWeight: 500
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      textTransform: "none"
    }
  },
  palette: {
    primary: {
      main: '#7f56d9',
      light: '#f9f5ff',
      dark: '#6941c6'
    },
    secondary: {
      main: '#475467',
      light: '#EAECF0'
    },
    error: {
      main: '#d92d20',
      light: '#fff1f3',
      dark: '#c01048'
    },
    warning: {
      main: '#f2f4f7',
      light: '#1B2341', // modal background dark
      dark: '#475467' // modal inner background dark
    },
    success: {
      main: '#32D583',
      light: '#A6F4C5',
      dark: '#3CCB7F'
    },
    info: {
      main: '#0B032C',
      light: '#141C3A',
      dark: '#1B2341'
    },
    background: {
      default: 'none',
      paper: '#1D2939'
    },
    common: {
      black: '#FCFCFD',
      white: '#000000'
    },
    text: {
      primary: '#EAECF0',
    },
    divider: '#0B032C'
  }
})