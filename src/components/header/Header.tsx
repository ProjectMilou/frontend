import React, { useState } from 'react';
import {
  AppBar,
  Button,
  createStyles,
  Dialog,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/placeholder.png';
import NavLink from './NavLink';
import Login from '../shell/login/Login';
import UserService from '../../services/UserService';
import SearchBar from '../analyser/search/SearchBar';
import Register from '../shell/register/Register';
import Reset from '../shell/reset/Reset';
import { Context } from '../../state/context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      maxWidth: 100,
      marginRight: theme.spacing(1.25),
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(0.5),
      height: theme.spacing(6),
    },
    dialog: {
      borderRadius: '10px',
      maxWidth: '450px',
      width: '100%',
      margin: 'auto',
      height: 'min-content',
    },
    paper: {
      minWidth: '350px',
    },
    container: {
      height: 'auto',
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { t } = useTranslation();
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Link to="/">
          <img src={logo} alt="milou-logo" className={classes.logo} />
        </Link>
        <NavLink to="/">{t('shell.home')}</NavLink>
        <NavLink to="/portfolio">{t('portfolio')}</NavLink>
        <NavLink to="/analyser">{t('analyser')}</NavLink>
        <NavLink to="/academy">{t('shell.academy')}</NavLink>
        <SearchBar />
        <div className={classes.grow} />

        {state.loggedIn ? (
          <>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => {
                UserService.logout();
                dispatch({ type: 'CLOSE_LOGIN' });
              }}
            >
              {t('shell.logout')}
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component={Link}
              to="/profile"
            >
              {t('shell.profile.profile-header')}
            </Button>
          </>
        ) : (
          <>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
            >
              {t('shell.login')}
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setOpenRegister(true)}
            >
              {t('shell.register')}
            </Button>
          </>
        )}

        <Dialog
          open={state.openLogin}
          onClose={() => dispatch({ type: 'CLOSE_LOGIN' })}
          className={classes.dialog}
          classes={{ paper: classes.paper, container: classes.container }}
        >
          <Login
            closePopUp={() => {
              dispatch({ type: 'CLOSE_LOGIN' });
            }}
            openRegisterPopUp={() => {
              dispatch({ type: 'CLOSE_LOGIN' });
              setOpenRegister(true);
            }}
            openForgotPasswordPopUp={() => {
              dispatch({ type: 'CLOSE_LOGIN' });
              setOpenForgotPassword(true);
            }}
          />
        </Dialog>

        <Dialog
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          className={classes.dialog}
          classes={{ paper: classes.paper, container: classes.container }}
        >
          <Register
            closePopUp={() => setOpenRegister(false)}
            openLoginPopUp={() => {
              setOpenRegister(false);
              dispatch({ type: 'OPEN_LOGIN' });
            }}
          />
        </Dialog>

        <Dialog
          open={openForgotPassword}
          onClose={() => setOpenForgotPassword(false)}
          className={classes.dialog}
          classes={{ paper: classes.paper }}
        >
          <Reset closePopUp={() => setOpenForgotPassword(false)} />
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
