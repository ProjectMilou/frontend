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
import Register from '../shell/register/Register';
import ForgotPassword from '../shell/forgotPassword/ForgotPassword';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      maxWidth: 100,
      marginRight: '10px',
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    dialog: {
      borderRadius: '10px',
      maxWidth: '450px',
      margin: 'auto',
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

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

        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => setOpenLogin(true)}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenRegister(true)}
        >
          Register
        </Button>
        <Dialog
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          className={classes.dialog}
        >
          <Login
            closePopUp={() => setOpenLogin(false)}
            openRegisterPopUp={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
            openForgotPasswordPopUp={() => {
              setOpenLogin(false);
              setOpenForgotPassword(true);
            }}
          />
        </Dialog>
        <Dialog
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          className={classes.dialog}
        >
          <Register
            closePopUp={() => setOpenRegister(false)}
            openLoginPopUp={() => {
              setOpenRegister(false);
              setOpenLogin(true);
            }}
          />
        </Dialog>
        <Dialog
          open={openForgotPassword}
          onClose={() => setOpenForgotPassword(false)}
          className={classes.dialog}
        >
          <ForgotPassword closePopUp={() => setOpenForgotPassword(false)} />
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
