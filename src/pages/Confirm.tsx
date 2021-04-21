import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Dialog,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import ClearIcon from '@material-ui/icons/Clear';
import { Trans, useTranslation } from 'react-i18next';
import WelcomeWindow from '../components/shell/login/WelcomeWindow';
import logo from '../assets/images/logo1.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconLogo: {
      maxWidth: 150,
      display: 'block',
      margin: '10px auto',
    },
    iconClear: {
      position: 'absolute',
      right: theme.spacing(2.5),
      top: theme.spacing(2.5),
      cursor: 'pointer',
    },
    dialog: {
      borderRadius: theme.spacing(1.25),
      width: '100%',
      margin: ' 100px auto',
      height: 'min-content',
    },
    paper: {
      minWidth: theme.spacing(45),
      padding: theme.spacing(2.5),
    },
  })
);

interface ConfirmProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const url = 'https://api.milou.io';

const Confirm: React.FC<ConfirmProps> = (props) => {
  const { id, token } = props;
  const { t } = useTranslation()
  const { dialog, paper, iconClear, iconLogo } = useStyles();
  const [openDialog, setOpenDialog] = useState<boolean>(true);

  type State = 'registerFailed' | 'registerConfirmed' | 'load';
  const [state, setState] = useState<State>('load');

  useEffect(() => {
    fetch(url.concat('/user/register/confirm'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, token }),
    }).then((response) => {
      if (response.ok) {
        setState('registerConfirmed');
      } else {
        setState('registerFailed');
      }
    });
  }, [id, token]);

  const closePopUp = () => {
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => closePopUp}
      className={dialog}
      classes={{ paper }}
    >
      <ClearIcon
        className={iconClear}
        color="primary"
        role="button"
        onClick={closePopUp}
        tabIndex={0}
        data-testid="icon"
      />
      <img src={logo} alt="milou-logo" className={iconLogo} />

      {state === 'registerConfirmed' && (
        <WelcomeWindow
          closePopUp={closePopUp}
          text={[t("shell.message.welcome"), t("shell.message.registered")]}
        />
      )}

      {state === 'registerFailed' && (
        <Typography align="center">
          <Trans i18nKey="error.invalidToken" components={{ break: <br /> }} />
        </Typography>
      )}
    </Dialog>
  );
};

export default Confirm;
