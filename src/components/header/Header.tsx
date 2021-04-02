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
import { UserService } from '../../services/UserService';

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
      width: '100%',
      margin: ' 100px auto',
      height: 'min-content',
    },
    paper: {
      minWidth: '350px',
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
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
              classes={{ paper: classes.paper }}
            >
              <Login
                closePopUp={() => {
                  setOpenLogin(false);
                  setLoggedIn(UserService.isLoggedIn());
                }}
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
              classes={{ paper: classes.paper }}
            >
              <Register
                closePopUp={() => setOpenRegister(false)}
                openLoginPopUp={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
              />
            </Dialog>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
