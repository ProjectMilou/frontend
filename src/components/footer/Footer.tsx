import React from 'react';
import { createStyles, Divider, Grid, makeStyles, Theme } from '@material-ui/core';
import { Link } from '@reach/router';
import logo from '../../assets/images/logo2.png';
import Ellipse from './Ellipse';

const useStyles = makeStyles((theme: Theme) => {
    const { main, contrastText } = theme.palette.primary;
    return createStyles({
        logo: {
            maxWidth: 130,
            marginRight: '10px'
        },
        link: {
            color: contrastText,
            textDecoration: "none",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 12
        },
        root: {
            backgroundColor: main,
            padding: 50,
        },
        divider: {
            backgroundColor: "white"
        },
        copyrightText: {
            color: contrastText,
            fontSize: 11.5
        },
        iconGrid: {
            padding: 20
        },
        linkGrid: {
            paddingBottom: 20
        }
    })
});

const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                className={classes.linkGrid}>
                <Grid container xs={4} justify="flex-start" spacing={8}>
                    <Grid item>
                        <Link to="/aboutus" className={classes.link}>About us</Link>
                    </Grid>
                    <Grid item>
                        <Link to="/mobileapp" className={classes.link}>Mobile App</Link>
                    </Grid>
                </Grid>
                <Grid container xs={4} justify="center">
                    <Grid item>
                        <img src={logo} alt="milou-logo" className={classes.logo} />
                    </Grid>
                </Grid>

                <Grid container xs={4} justify="flex-end" spacing={6} direction="row">
                    <Grid item>
                        <Link to="/privacy" className={classes.link}>Privacy Policy</Link>
                    </Grid>
                    <Grid item>
                        <Link to="/terms" className={classes.link}>Terms and Conditions</Link>
                    </Grid>
                </Grid>
            </Grid>

            <Divider className={classes.divider} />

            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >
                <Grid item className={classes.iconGrid}>
                    <Ellipse />
                    <Ellipse />
                    <Ellipse />
                    <Ellipse />
                </Grid>
                <Grid item className={classes.copyrightText}>
                    © Photo, Inc. 2019. We love our users!
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;