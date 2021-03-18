import React from 'react';
import { createStyles, Divider, Grid, makeStyles, SvgIcon, Theme } from '@material-ui/core';
import { Link } from '@reach/router';
import logo from '../../assets/images/logo2.png';
import Ellipse from './Ellipse';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            maxWidth: 100,
            marginRight: '10px'
        },
        grow: {
            flexGrow: 1
        },
        link: {
            color: theme.palette.primary.contrastText,
            textDecoration: "none",
            textTransform: "none",
            margin: 10,
            fontSize: 15
        },
        p: {
            textAlign: 'center'
        },
        container: {
            backgroundColor: theme.palette.primary.main
        }
    })
);

const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Grid container direction="row" alignItems="center" >
                <Grid item xs justify="space-between">
                    <Link to="/aboutus" className={classes.link}>About us</Link>
                    <Link to="/mobileapp" className={classes.link}>Mobile App</Link>
                </Grid>
                <Grid container xs={6} justify="center">
                    <Grid item>
                        <img src={logo} alt="milou-logo" className={classes.logo} />
                    </Grid>
                </Grid>

                <Grid item xs>
                    <Link to="/privacy" className={classes.link}>Privacy Policy</Link>
                    <Link to="/terms" className={classes.link}>Terms and Conditions</Link>
                </Grid>
            </Grid>
            <Divider color="white" />
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >
                <Grid item><Ellipse /><Ellipse /><Ellipse /><Ellipse /></Grid>
                <Grid item>© Photo, Inc. 2019. We love our users!</Grid>
            </Grid>
        </div>
    );
};

export default Footer;