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
import { ErrorCode, errorMessageKey, errorTitleKey } from '../../Errors';

export type ErrorMessageProps = {
  messageKey?: string;
  error: ErrorCode;
  handling?: {
    buttonText: string;
    action: () => void;
  };
};

const useStyles = makeStyles({
  card: { maxWidth: '750px', margin: 'auto' },
  icon: { backgroundColor: '#B80C09' },
});

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  messageKey,
  error,
  handling,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
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
      {handling && (
        <CardActions>
          <Button size="small" onClick={handling.action}>
            {t(handling.buttonText)}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ErrorMessage;
