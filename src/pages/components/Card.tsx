import React from 'react';
import { Button, Box, Grid, Typography } from '@material-ui/core';

import milou from '../media/milou.png';

const Card: React.FC = () => (
  <Box
    display="flex"
    flexDirection="row"
    p={8}
    mx={0}
    mb={8}
    style={{ background: '#0c1a3a', marginLeft: 0 }}
    justifyContent="center"
  >
    <Grid container direction="column" alignItems="center" wrap="nowrap">
      <Grid item>
        <img
          src={milou}
          title="2020-12-15 Logo hell"
          alt="2020-12-15 Logo hell"
        />
      </Grid>
      <Grid item>
        <Typography variant="h2">Empower to invest.</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained">Start now</Button>
      </Grid>
    </Grid>
  </Box>
);

export default Card;
