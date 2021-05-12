import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

const Privacy: React.FC<RouteComponentProps> = () => (
  <Container maxWidth="md">
    <Box my={5}>
      <Typography variant="h2" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </Typography>
    </Box>
  </Container>
);

export default Privacy;
