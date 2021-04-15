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
import logo from '../../assets/images/logo1.png';
import NavLink from './NavLink';
import Login from '../shell/login/Login';
import UserService from '../../services/UserService';
import SearchBar from '../analyser/search/SearchBar';
import Register from '../shell/register/Register';
import ForgotPassword from '../shell/forgotPassword/ForgotPassword';
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
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(UserService.isLoggedIn());

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Link to="/">
          <img src={logo} alt="milou-logo" className={classes.logo} />
        </Link>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/analyser">Analyser</NavLink>
        <NavLink to="/academy">Academy</NavLink>
        <div className={classes.grow} />

        <SearchBar />
        {loggedIn ? (
          <>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => {
                UserService.logout();
                setLoggedIn(false);
              }}
            >
              Logout
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component={Link}
              to="/profile"
            >
              Profile
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
              Login
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setOpenRegister(true)}
            >
              Register
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
              setLoggedIn(UserService.isLoggedIn());
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
          <ForgotPassword closePopUp={() => setOpenForgotPassword(false)} />
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
