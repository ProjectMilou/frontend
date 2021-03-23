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
