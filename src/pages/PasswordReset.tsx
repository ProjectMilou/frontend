import React, { useState } from 'react';
import {
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
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import PasswordField from '../components/shell/register/PasswordField';
import { ErrorState, PasswordInput } from '../components/shell/utils';
import UserService from '../services/UserService';
import { checkPasswordRequirements, IRequirements } from '../components/shell/register/util-password';
import PasswordRequirement from '../components/shell/register/PasswordRequirement';

const useStyles = makeStyles((theme) =>
  createStyles({
    formular: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(5, 3),
    },
  })
);
interface PasswordResetProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  // TODO check if token is valid beforehand and only show form when it is
  const { id, token } = props;
  const { t } = useTranslation();
  const { formular } = useStyles(useTheme());

  const [hasError, setError] = useState({
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const [login, setLogin] = useState<PasswordInput>({
    password: '',
    confirmPassword: '',
  });

  const [requirements, setRequirements] = useState({
    requirement: [
      {
        text: t('error.passwordRequirement.length'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.cases'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.number'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.specialCharacter'),
        done: false,
      },
    ],
  } as IRequirements);

  // TODO This is the copy-pasta antipattern and in dire need of refactoring
  // see components/shell/register/RegisterForm.tsc:35 ff

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    if (hasError[event.target.id as keyof ErrorState])
      setError({ ...hasError, [event.target.id]: '' });
    if (event.target.id === 'password')
      checkPasswordRequirements({
        password: event.target.value,
        setRequirements,
      });
  };

  const handleSubmit = () => {
    UserService.resetChange(String(id), String(token), login.password);
  };

  return (
    <Container maxWidth="xs">
      <Paper className={formular}>
        <DialogContent>
          <Typography variant="h5" align="center">
            Please enter your new password
          </Typography>
          <PasswordField
            hasError={hasError}
            setError={setError}
            login={login}
            handleChange={handleChange}
          />
        </DialogContent>

        <Box mx="auto" pb={1} pl={3}>
          {requirements.requirement.map(({ text, done }, index) => (
            <PasswordRequirement
              key={text.concat(index.toString())}
              text={text}
              done={done}
            />
          ))}
        </Box>

        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={
              requirements.requirement.map((r) => r.done).some((done) => !done) ||
              login.password !== login.confirmPassword
            }
          >
            submit
          </Button>
        </DialogActions>
      </Paper>
    </Container>
  );
};

export default PasswordReset;
