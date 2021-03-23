import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import { Link } from '@reach/router';
import React from 'react';
import logo from '../../assets/images/logo1.png';
import NavLink from './NavLink';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            maxWidth: 100,
            marginRight: '10px'
        },
        grow: {
            flexGrow: 1
        },
        button: {
            margin: theme.spacing(1)
        }
    })
);

const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <Link to="/">
                    <img src={logo} alt="milou-logo" className={classes.logo} />
                </Link>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/portofolio">Portofolio</NavLink>
                <NavLink to="/analyser">Analyser</NavLink>
                <NavLink to="/academy">Academy</NavLink>

                <div className={classes.grow} />

                <Button className={classes.button} variant="outlined" color="primary">Login</Button>
                <Button variant="contained" color="primary">Register</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;