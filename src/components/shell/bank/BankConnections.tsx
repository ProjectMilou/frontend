import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BankService from '../../../services/BankAccountService';
import IBankConnection from '../../../services/models/bank/IBankConnection';

const BankConnections: React.FC = () => {
  const { t } = useTranslation();
  const [connections, setConnections] = useState<IBankConnection[]>();
  const [hasError, setHasError] = useState(false);

  BankService.getConnections()
    .then((v) => {
      setConnections(v);
    })
    .catch((e) => {
      setHasError(true);
      console.log(e);
    });

  if (hasError)
    return (
      <Typography color="error">{t('shell.bank.connection.error')}</Typography>
    );

  return (
    <List>
      {connections &&
        connections.map((c) => (
          <ListItem>
            <ListItemText
              primary={c.accountIds}
              secondary={c.bankConnectionId}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default BankConnections;
