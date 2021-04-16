import React, { useState } from 'react';
import {
  Container,
  Paper,
  makeStyles,
  createStyles,
  useTheme,
  Typography,
  Button,
  Dialog,
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import ResetChangeForm from '../components/shell/reset/ResetChangeForm';
import { Context } from '../state/context';
import Reset from '../components/shell/reset/Reset';

const useStyles = makeStyles((theme) =>
  createStyles({
    formular: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(5, 3),
    },
    button: {
      marginTop: theme.spacing(4),
    },
    dialog: {
      borderRadius: '10px',
      maxWidth: '450px',
      width: '100%',
      margin: 'auto',
      height: 'min-content',
    },
    paper: {
      minWidth: '350px',
    },
  })
);
interface ResetChangeProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const ResetChange: React.FC<ResetChangeProps> = (props) => {
  const { id, token } = props;
  const { t } = useTranslation();
  const { dispatch } = React.useContext(Context);
  const { formular, button, dialog, paper } = useStyles(useTheme());

  type State = 'resetForm' | 'resetConfirmed' | 'resetFailed';
  const [resetState, setResetState] = useState<State>('resetForm');

  const [openReset, setOpenReset] = useState(false);

  return (
    <Container maxWidth="xs">
      <Paper className={formular}>
        {resetState === 'resetForm' && (
          <ResetChangeForm
            id={String(id)}
            token={String(token)}
            onSuccess={() => setResetState('resetConfirmed')}
            onFailure={() => setResetState('resetFailed')}
          />
        )}

        {resetState === 'resetConfirmed' && (
          <>
            <Typography variant="h4" align="center">
              {t('shell.resetChange.success')}
            </Typography>

            <Button
              type="button"
              variant="contained"
              color="primary"
              className={button}
              fullWidth
              onClick={() => {
                navigate('/');
                dispatch({ type: 'OPEN_LOGIN' });
              }}
            >
              {t('shell.login')}
            </Button>
          </>
        )}

        {resetState === 'resetFailed' && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              {t('shell.resetChange.failure')}
            </Typography>

            <Button
              type="button"
              variant="contained"
              color="primary"
              className={button}
              fullWidth
              onClick={() => {
                setOpenReset(true);
              }}
            >
              {t('error.retry')}
            </Button>

            <Dialog
              open={openReset}
              onClose={() => setOpenReset(false)}
              className={dialog}
              classes={{ paper }}
            >
              <Reset closePopUp={() => setOpenReset(false)} />
            </Dialog>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ResetChange;
