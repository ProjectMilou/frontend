import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import BankService from '../../../services/BankAccountService';
import IBankConnection from '../../../services/models/bank/IBankConnection';

const BankConnections: React.FC = () => {
  const [connections, setConnections] = useState<IBankConnection[]>();

  /* This keeps raising an
    SyntaxError: Unexpected end of JSON input
    at Function.getConnections (BankAccountService.ts:43)
  */

  BankService.getConnections()
    .then((v) => {
      setConnections(v);
    })
    .catch((e) => console.log(e));

  console.log(connections);

  return (
    <List>
      {connections &&
        connections.map((c) => (
          <ListItem>
            <ListItemText primary={c.accountIds} />
          </ListItem>
        ))}
    </List>
  );
};

export default BankConnections;
