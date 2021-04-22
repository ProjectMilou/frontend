import {
  Button,
  Dialog,
  createStyles,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  Box,
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BankAccountService from '../../../services/BankAccountService';
import UserService from '../../../services/UserService';
import BankSearch from '../bank/BankSearch';
import BankConnections from '../bank/BankConnections';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(3, 0),
    },
    label: {
      color: theme.palette.primary.dark,
    },
    details: {
      maxWidth: '50%',
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

const Profile: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addBankIsOpen, setAddBankIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    UserService.getProfile()
      .then((data) =>
        setUser({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
        })
      )
      .catch(() => navigate('/'));
  }, []);

  const onEdit = () => {
    UserService.editProfile(user.firstName, user.lastName).finally(() =>
      setEdit(false)
    );
  };

  const handleDialogClose = () => setDialogOpen(false);

  const onDelete = () => {
    UserService.deleteProfile().then((ok) => {
      if (ok) navigate('/');
    });
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Paper square>
            <Box p={4}>
              <Typography variant="h3" gutterBottom>
                {t('shell.profile.profile-header')}
              </Typography>

              <Divider />

              <Box my={3} maxWidth="xs" className={classes.details}>
                <Typography variant="h5" gutterBottom>
                  {t('shell.profile.account-details.header')}
                </Typography>
                <Typography className={classes.label}>
                  {t('shell.profile.account-details.email')}
                </Typography>
                <TextField
                  inputProps={{ 'data-testid': 'email' }}
                  variant="outlined"
                  value={user.email}
                  disabled
                  size="small"
                  fullWidth
                />
                <br />
                <br />
                <Typography className={classes.label}>
                  {t('shell.profile.account-details.first-name')}
                </Typography>
                <TextField
                  inputProps={{ 'data-testid': 'firstname' }}
                  variant="outlined"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  size="small"
                  fullWidth
                  disabled={!edit}
                />
                <br />
                <br />
                <Typography className={classes.label}>
                  {t('shell.profile.account-details.last-name')}
                </Typography>
                <TextField
                  inputProps={{ 'data-testid': 'lastname' }}
                  variant="outlined"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  size="small"
                  fullWidth
                  disabled={!edit}
                />
              </Box>

              <Divider />

              <Box my={3}>
                <Typography variant="h5" gutterBottom>
                  Bank accounts
                </Typography>

                <BankConnections />

                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAddBankIsOpen(true)}
                >
                  {t(`shell.profile.account-details.add-bankconnection`)}
                </Button>
                <Dialog
                  open={addBankIsOpen}
                  onClose={() => setAddBankIsOpen(false)}
                  className={classes.dialog}
                  classes={{ paper: classes.paper }}
                >
                  <BankSearch />
                </Dialog>
              </Box>

              <Divider />

              <Box my={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={edit ? onEdit : () => setEdit(true)}
                >
                  {t(
                    `shell.profile.account-details.${
                      edit ? 'update' : 'edit'
                    }-details`
                  )}
                </Button>{' '}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setDialogOpen(true)}
                >
                  {t('shell.profile.account-details.delete-account')}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('shell.profile.account-details.delete-dialog.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('shell.profile.account-details.delete-dialog.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} color="primary">
            {t('shell.profile.account-details.delete-dialog.ok')}
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {t('shell.profile.account-details.delete-dialog.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
