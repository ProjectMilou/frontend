import React, { useEffect } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Router, useLocation } from '@reach/router';
import LandingPage from '../pages/LandingPage';
import Analyser from './analyser/Analyser';
import Portfolio from './portfolio/Portfolio';
import Header from './header/Header';
import Footer from './footer/Footer';
import Profile from '../pages/Profile';
import Imprint from '../pages/Imprint';
import AboutUs from '../pages/AboutUs';
import Privacy from '../pages/Privacy';
import Page404 from '../pages/Page404';
import Confirm from '../pages/Confirm';
import ResetChange from '../pages/ResetChange';
import { ContextProvider } from '../state/context';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBlue: Palette['primary'];
    teal: Palette['primary'];
    orange: Palette['primary'];
    darkOrange: Palette['primary'];
  }

  interface PaletteOptions {
    lightBlue?: PaletteOptions['primary'];
    teal?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    darkOrange?: PaletteOptions['primary'];
  }
}

interface ScrollToTopProps {
  children: JSX.Element[];
  path: string;
}

function ScrollToTop({ children, path }: ScrollToTopProps): JSX.Element {
  // workaround eslint/no-unused-vars, because every child of @reach-router/Router needs a path prop
  path.concat('');

  const { pathname } = useLocation();
  useEffect(() => {
    if (window.scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return <>{children}</>;
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
    orange: {
      main: '#F6AE2D',
    },
    darkOrange: {
      main: '#D75D1B',
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
            <ScrollToTop path="/">
              <LandingPage path="/" />
              <Analyser path="/analyser/*" />
              <Portfolio path="/portfolio/*" />
              <Imprint path="/imprint" />
              <AboutUs path="/aboutus" />
              <Privacy path="/privacy" />
              <Profile path="/profile" />
              <Confirm path="/confirm/:id/:token" />
              <ResetChange path="/reset/:id/:token" />
              <Page404 default />
            </ScrollToTop>
          </Router>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  </ContextProvider>
);

export default App;
