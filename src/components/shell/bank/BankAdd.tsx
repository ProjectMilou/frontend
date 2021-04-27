import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import BankAccountService from '../../../services/BankAccountService';
import BankAddSearch from './BankAddSearch';
import BankAddDialog from './BankAddDialog';

export enum State {
  search,
  add,
  success,
}

const BankAdd: React.FC = () => {
  type State = 'search' | 'add' | 'success';
  const [link, setLink] = useState('');
  const [userState, setUserState] = useState<State>('search');

  const handleAdding = (id: number) => {
    setUserState('add');
    BankAccountService.add(id).then((v) => {
      setLink(v);
    });
  };

  return (
    <Container>
      {userState === 'search' && <BankAddSearch handleAdding={handleAdding} />}
      {userState === 'add' && <BankAddDialog link={link} />}
    </Container>
  );
};

export default BankAdd;
