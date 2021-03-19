import React, { useState } from 'react';
import {
  Button,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import Shell from './shell/Shell';
import Analyser from './analyser/Analyser';
import Portfolio from './portfolio/Portfolio';
import Register from './shell/register/Register';
import Login from './shell/login/Login';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#415176',
      main: '#122654',
      dark: '#0c1a3a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#df4f9b',
      main: '#D72483',
      dark: '#96195b',
      contrastText: '#000',
    },
  },
});

const App: React.FC = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* TODO: Change component hierarchy */}
      <p>Here be an app</p>
      <Shell />
      <Analyser />
      <Portfolio />
      <Button variant="contained" onClick={() => setOpenLogin(true)}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setOpenRegister(true)}>
        Register
      </Button>
      {openLogin && (
        <Login
          closePopUp={() => setOpenLogin(false)}
          openRegisterPopUp={() => {
            setOpenLogin(false);
            setOpenRegister(true);
          }}
        />
      )}

      {openRegister && (
        <Register
          closePopUp={() => setOpenRegister(false)}
          openLoginPopUp={() => {
            setOpenRegister(false);
            setOpenLogin(true);
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
