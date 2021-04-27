import {
  Button,
  Dialog,
  createStyles,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  Box,
  Container,
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserService from '../services/UserService';
import BankAdd from '../components/shell/bank/BankAdd';
import BankConnections from '../components/shell/bank/BankConnections';
import DashboardHeader from '../components/shared/DashboardHeader';
import BankAccountService from '../services/BankAccountService';

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

  const onUpdate = () => {
    UserService.editProfile(user.firstName, user.lastName);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const onDelete = () => {
    UserService.deleteProfile().then((ok) => {
      if (ok) navigate('/');
    });
  };

  return (
    <>
      <DashboardHeader>{t('shell.profile.profile-subheader')}</DashboardHeader>
      <Container maxWidth="lg">
        <Box my={2.5}>
          <Typography variant="h3" gutterBottom>
            {t('shell.profile.profile-header')}
          </Typography>

          <Paper square>
            <Box p={4}>
              <Box mb={3} maxWidth="xs" className={classes.details}>
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
                />
              </Box>

              <Box my={3}>
                <Button variant="contained" color="primary" onClick={onUpdate}>
                  {t(`shell.profile.account-details.update-details`)}
                </Button>{' '}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setDialogOpen(true)}
                >
                  {t('shell.profile.account-details.delete-account')}
                </Button>
              </Box>

              <Divider />

              <Box my={3} className={classes.details}>
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
                </Button>{' '}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    BankAccountService.refresh();
                  }}
                >
                  {t('shell.profile.account-details.update-bankconnection')}
                </Button>
                <Dialog
                  open={addBankIsOpen}
                  onClose={() => setAddBankIsOpen(false)}
                  className={classes.dialog}
                  classes={{ paper: classes.paper }}
                >
                  <BankAdd />
                </Dialog>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

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
