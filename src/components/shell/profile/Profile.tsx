import {
  Button,
  createStyles,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px 300px 10px 300px',
    },
    heading1: {
      margin: 0,
    },
    subpaper: {
      padding: 40,
    },
    label: {
      color: theme.palette.primary.dark,
    },
    details: {
      maxWidth: '50%',
    },
  })
);

const Profile: React.FC<RouteComponentProps> = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetch('https://api.milou.io/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();

        navigate('/');
        return undefined;
      })
      .then((data) => {
        if (!data) return;
        if (data.user && data.user.id) setEmail(data.user.id);
        if (data.firstName) setFirstName(data.firstName);
        if (data.lastName) setLastName(data.lastName);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Paper square>
        <div className={classes.subpaper}>
          <h1 className={classes.heading1}>Profile</h1>
          <Divider />
          <h2>Account Details</h2>
          <div className={classes.details}>
            <Typography className={classes.label}>Email</Typography>
            <TextField
              variant="outlined"
              value={email}
              disabled
              size="small"
              fullWidth
            />
            <br />
            <br />
            <Typography className={classes.label}>First Name</Typography>
            <TextField
              variant="outlined"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              size="small"
              fullWidth
            />
            <br />
            <br />
            <Typography className={classes.label}>Last Name</Typography>
            <TextField
              variant="outlined"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              size="small"
              fullWidth
            />
            <br />
            <br />
            <Button variant="contained" color="primary">
              Update Details
            </Button>{' '}
            <Button variant="outlined" color="primary">
              Delete Account
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Profile;
