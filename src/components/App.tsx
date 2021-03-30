import React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Router } from '@reach/router';
import Shell from './shell/Shell';
import Analyser from './analyser/Analyser';
import Portfolio from './portfolio/Portfolio';
import Header from './header/Header';
import Footer from './footer/Footer';
// TODO: use @path variables in tsconfig
import Imprint from '../pages/Imprint';
import Privacy from '../pages/Privacy';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBlue: Palette['primary'];
    teal: Palette['primary'];
  }
  interface PaletteOptions {
    lightBlue: PaletteOptions['primary'];
    teal: PaletteOptions['primary'];
  }
}

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
    h1: {
      fontSize: 56,
      lineHeight: 80,
    },
    h2: {
      fontSize: 48,
      lineHeight: 72,
    },
    h4: {
      fontSize: 24,
      lineHeight: 36,
    },
    body1: {
      fontSize: 18,
      lineHeight: 30,
    },
    body2: {
      fontSize: 36,
      lineHeight: 50,
    },
  },
  palette: {
    background: {
      default: '#E5E5E5',
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
      main: '#0D1B3B',
    },
    teal: {
      main: '#34CFB2',
    },
  },
});

const App: React.FC = () => (
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
          {/* <Frontpage path="/" /> */}
          <Shell path="/shell" />
          <Analyser path="/analyser" />
          <Portfolio path="/portfolio" />
          <Imprint path="/imprint" />
          <Privacy path="/privacy" />
        </Router>
      </div>

      <Footer />
    </div>
  </ThemeProvider>
);

export default App;
