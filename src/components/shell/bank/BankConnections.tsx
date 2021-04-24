import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';
import BankService from '../../../services/BankAccountService';
import IBankConnection from '../../../services/models/bank/IBankConnection';

const BankConnections: React.FC = () => {
  const { t } = useTranslation();
  const [connections, setConnections] = useState<IBankConnection[]>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    BankService.getConnections()
      .then((v) => {
        setConnections(v);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  const handleDelete = (id: string) => {
    BankService.deleteConnection(id);
  };

  if (hasError)
    return (
      <Typography color="error">{t('shell.bank.connection.error')}</Typography>
    );

  return (
    <Paper>
      <List>
        {connections &&
          connections.map((c) => (
            <>
              <ListItem>
                <ListItemText primary={c.name} secondary={c.bankConnectionId} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDelete(c.bankConnectionId)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))}
      </List>
    </Paper>
  );
};

export default BankConnections;
