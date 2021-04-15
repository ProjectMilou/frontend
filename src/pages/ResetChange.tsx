import React, { useState } from 'react';
import {
  Container,
  Paper,
  makeStyles,
  createStyles,
  useTheme,
  Typography,
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import ResetChangeForm from '../components/shell/reset/ResetChangeForm';

const useStyles = makeStyles((theme) =>
  createStyles({
    formular: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(5, 3),
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
  const { formular } = useStyles(useTheme());
  type State = 'resetForm' | 'resetConfirmed' | 'resetFailed';
  const [resetState, setResetState] = useState<State>('resetForm');

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
          <Typography variant="h5" align="center">
            {t('shell.resetChange.success')}
          </Typography>
        )}

        {resetState === 'resetFailed' && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              {t('error.retry')}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ResetChange;
