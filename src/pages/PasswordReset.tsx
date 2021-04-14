import React from 'react';
import { DialogContent, Container, TextField } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

interface PasswordResetProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  const { id, token } = props;
  return (
    <Container maxWidth="md">
      <DialogContent>TODO add form fields</DialogContent>
    </Container>
  );
};

export default PasswordReset;
