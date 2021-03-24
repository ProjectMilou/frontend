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
import logo from '../../assets/images/logo1.png';
import NavLink from './NavLink';
import Login from '../shell/login/Login';
import Register from '../shell/register/Register';

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

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <NavLink to="/">
          <img src={logo} alt="milou-logo" className={classes.logo} />
        </NavLink>
        <Button>
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button>
          <NavLink to="/portfolio">Portfolio</NavLink>
        </Button>
        <Button>
          <NavLink to="/analyser">Analyser</NavLink>
        </Button>
        <Button>
          <NavLink to="/academy">Academy</NavLink>
        </Button>

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
