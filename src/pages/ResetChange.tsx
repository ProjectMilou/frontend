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
          <Typography>Successfully changed your password</Typography>
        )}

        {resetState === 'resetFailed' && (
          <Typography>Something happened</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ResetChange;
