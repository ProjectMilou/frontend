import { Button, createStyles, Divider, Grid, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '10px 300px 10px 300px'
        },
        heading1: {
            margin: 0
        },
        subpaper: {
            padding: 40
        },
        label: {
            color: theme.palette.primary.dark
        },
        details: {
            maxWidth: '50%'
        }
    })
);

const Profile: React.FC<RouteComponentProps> = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper square>
                <div className={classes.subpaper}>
                    <h1 className={classes.heading1}>Profile</h1>
                    <Divider />
                    <h2>Account Details</h2>
                    <div className={classes.details}>
                        <Typography className={classes.label}>Email</Typography>
                        <TextField variant="outlined" defaultValue="test@getmilou.de" disabled size="small" fullWidth />
                        <br />
                        <br />
                        <Typography className={classes.label}>First Name</Typography>
                        <TextField variant="outlined" defaultValue="Test" size="small" fullWidth />
                        <br />
                        <br />
                        <Typography className={classes.label}>Last Name</Typography>
                        <TextField variant="outlined" defaultValue="Milou" size="small" fullWidth />
                        <br />
                        <br />
                        <Button variant="contained" color="primary">Update Details</Button>
                        {' '}
                        <Button variant="outlined" color="primary">Delete Account</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Profile;