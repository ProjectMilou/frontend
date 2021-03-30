import {
  Button,
  createStyles,
  Divider,
  Grid,
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

interface UserProfile {
  firstName?: string;
  lastName?: string;
  user?: {
    id?: string;
  };
}

const Profile: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const classes = useStyles();

  function handleData(data: UserProfile) {
    if (!data) return;
    setUser({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: (data.user && data.user.id) || '',
    });
  }

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
      .then(handleData);
  }, []);

  const onEdit = () => {
    const token = localStorage.getItem('token');
    fetch('https://api.milou.io/user/edit', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    })
      .then((r) => r.json())
      .then(handleData);
  };

  const onDelete = () => {
    const token = localStorage.getItem('token');
    fetch('https://api.milou.io/user/profile', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => navigate('/'));
  };

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Paper square>
          <div className={classes.subpaper}>
            <h1 className={classes.heading1}>Profile</h1>
            <Divider />
            <h2>Account Details</h2>
            <div className={classes.details}>
              <Typography className={classes.label}>Email</Typography>
              <TextField
                variant="outlined"
                value={user.email}
                disabled
                size="small"
                fullWidth
              />
              <br />
              <br />
              <Typography className={classes.label}>First Name</Typography>
              <TextField
                variant="outlined"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                size="small"
                fullWidth
              />
              <br />
              <br />
              <Typography className={classes.label}>Last Name</Typography>
              <TextField
                variant="outlined"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                size="small"
                fullWidth
              />
              <br />
              <br />
              <Button variant="contained" color="primary" onClick={onEdit}>
                Update Details
              </Button>{' '}
              <Button variant="outlined" color="primary" onClick={onDelete}>
                Delete Account
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
