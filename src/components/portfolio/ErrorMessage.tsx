import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { ErrorCode, errorMessageKey } from '../../Errors';

export type ErrorMessageProps = {
  messageKey?: string;
  error: ErrorCode;
  handling?: {
    buttonText: string;
    action: () => void;
  };
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  messageKey,
  error,
  handling,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <p>{messageKey ? t(messageKey) : t('error.message.default')}</p>
      <p>{t(errorMessageKey(error))}</p>
      {handling && (
        <Button onClick={handling.action}>{t(handling.buttonText)}</Button>
      )}
    </div>
  );
};

export default ErrorMessage;
