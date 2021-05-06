import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PasswordField from '../register/PasswordField';
import PasswordRequirement from '../register/PasswordRequirement';
import { ErrorState, PasswordInput } from '../utils';
import {
  checkPasswordRequirements,
  IRequirements,
} from '../register/util-password';
import UserService from '../../../services/UserService';
import InitialPasswordRequirements from '../register/initialRequirement';

export interface ResetChangeFormProps {
  id: string;
  token: string;
  onSuccess: () => void;
  onFailure: () => void;
}

const ResetChangeForm: React.FC<ResetChangeFormProps> = (props) => {
  const { t } = useTranslation();
  const { id, token, onSuccess, onFailure } = props;

  const [login, setLogin] = useState<PasswordInput>({
    password: '',
    confirmPassword: '',
  });

  const [hasError, setError] = useState({
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const [requirements, setRequirements] = useState<IRequirements>(
    InitialPasswordRequirements()
  );

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
    UserService.resetChange(id, token, login.password)
      .then((value) => (value ? onSuccess() : onFailure()))
      .catch(onFailure);
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h5" align="center">
          {t('shell.resetChange.enterPassword')}
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
          {t('submit')}
        </Button>
      </DialogActions>
    </>
  );
};

export default ResetChangeForm;
