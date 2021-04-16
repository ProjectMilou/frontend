import React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Router } from '@reach/router';
import LandingPage from '../pages/LandingPage';
import Shell from './shell/Shell';
import Analyser from './analyser/Analyser';
import Portfolio from './portfolio/Portfolio';
import Header from './header/Header';
import Footer from './footer/Footer';
import Profile from './shell/profile/Profile';
// TODO: use @path variables in tsconfig
import Imprint from '../pages/Imprint';
import AboutUs from '../pages/AboutUs';
import Privacy from '../pages/Privacy';
import Page404 from '../pages/Page404';
import Confirm from '../pages/Confirm';
import PasswordReset from '../pages/PasswordReset';
import { ContextProvider } from '../state/context';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBlue: Palette['primary'];
    teal: Palette['primary'];
  }

  interface PaletteOptions {
    lightBlue?: PaletteOptions['primary'];
    teal?: PaletteOptions['primary'];
  }
}

export const theme = createMuiTheme({
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
    background: {
      default: '#EEF1FB',
    },
    primary: {
      light: '#415176',
      main: '#122654',
      dark: '#0c1a3a',
      contrastText: '#EEF1FB',
    },
    secondary: {
      light: '#df4f9b',
      main: '#D72483',
      dark: '#96195b',
      contrastText: '#000',
    },
    success: {
      main: '#50E2A8',
    },
    warning: {
      main: '#FFC43B',
    },
    error: {
      main: '#D64745',
    },
    lightBlue: {
      main: '#3FBCF2',
    },
    teal: {
      main: '#34CFB2',
    },
  },
});

const App: React.FC = () => (
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />

        <div style={{ flexGrow: 1 }}>
          <Router>
            <LandingPage path="/" />
            <Shell path="/shell" />
            <Analyser path="/analyser/*" />
            <Portfolio path="/portfolio/*" />
            <Imprint path="/imprint" />
            <AboutUs path="/aboutus" />
            <Privacy path="/privacy" />
            <Profile path="/profile" />
            <Confirm path="/confirm/:id/:token" />
            <PasswordReset path="/passwordreset/:id/:token" />
            <Page404 default />
          </Router>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  </ContextProvider>
);

export default App;
