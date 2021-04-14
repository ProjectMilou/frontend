import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  Paper,
  Typography,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import PasswordField from '../components/shell/register/PasswordField';
import { ErrorState, UserInput } from '../components/shell/utils';

const useStyles = makeStyles((theme) =>
  createStyles({
    formular: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(5, 3),
    },
  })
);
interface PasswordResetProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  const { id, token } = props;
  const { formular } = useStyles(useTheme());

  const [hasError, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const [login, setLogin] = useState<UserInput>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Container maxWidth="xs">
      <Paper className={formular}>
        <DialogContent>
          <Typography variant="h5" align="center">
            Please enter your new password
          </Typography>
          <PasswordField
            hasError={hasError}
            login={login}
            handleChange={() => {}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {}}
          >
            submit
          </Button>
        </DialogActions>
      </Paper>
    </Container>
  );
};

export default PasswordReset;
