import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  errorMessageKey,
  errorTitleKey,
  isAuthenticationError,
} from '../../Errors';
import { Context } from '../../state/context';
import StorageService from '../../services/StorageService';

export type ErrorMessageProps = {
  /**
   * An optional translation key for a message that is displayed in addition to the error message.
   * Can be used to provide additional context to the user.
   */
  messageKey?: string;
  /** The error to display. */
  error: Error;
  /** Optional retry action. If set, a retry button is rendered. */
  retry?: () => void;
};

const useStyles = makeStyles({
  card: { maxWidth: '750px', margin: 'auto' },
  icon: { backgroundColor: '#B80C09' },
});

/**
 * Displays an error message with an optional retry button.
 *
 * * For authentication errors, the retry button opens the login dialog and
 *   removes the currently stored (invalid) token. After logging in
 *   successfully, the retry callback is called. Inside a {@link LoginWrapper},
 *   closing the dialog without logging in causes the LoginWrapper to navigate
 *   to the fallback URL.
 *
 * * For all other errors, the retry callback is called immediately on click.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  messageKey,
  error,
  retry,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { state, dispatch } = React.useContext(Context);
  const [loginOpened, setLoginOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (retry && loginOpened && state.loggedIn && !state.openLogin) {
      retry();
      setLoginOpened(false);
    }
  }, [retry, loginOpened, state]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.icon}>!</Avatar>}
        title={
          <Typography variant="h5" component="h2">
            {t(errorTitleKey(error))}
          </Typography>
        }
        subheader={messageKey ? t(messageKey) : t('error.message.default')}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {t(errorMessageKey(error))}
        </Typography>
      </CardContent>
      {retry && (
        <CardActions>
          {isAuthenticationError(error) ? (
            <Button
              size="small"
              onClick={() => {
                dispatch({ type: 'OPEN_LOGIN' });
                StorageService.removeToken();
                setLoginOpened(true);
              }}
            >
              {t('error.action.login')}
            </Button>
          ) : (
            <Button size="small" onClick={retry}>
              {t('error.action.retry')}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default ErrorMessage;
