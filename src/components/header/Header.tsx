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
        }

    })
);

const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <img src={logo} alt="milou-logo" className={classes.logo} />
                <Button><NavLink to="/">Home</NavLink></Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;