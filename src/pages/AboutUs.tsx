import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import ProfileCard from '../components/shell/landingPage/ProfileCard';
import LogoCard from '../components/shell/landingPage/LogoCard';

import linda from '../assets/images/linda.png';
import chris from '../assets/images/chris.png';
import julien from '../assets/images/julien.png';

const AboutUs: React.FC<RouteComponentProps> = () => (
  <Box>
    <Box px={16} pt={4} pb={6}>
      <Typography
        variant="h3"
        align="center"
        style={{ marginTop: '16px', marginBottom: '8px' }}
      >
        Our Team
      </Typography>
      <Typography variant="body1" align="center">
        Apps like Trade Republic and other direct brokers make investing easier
        and easier. The stock market is now accessible to everyone. Even so,
        many individuals do not have access to tools to make informed and
        informed investment decisions. Current solutions are often confusing and
        tailored to professional investors. This is exactly where we attack.
      </Typography>
    </Box>
    <Box
      bgcolor="#0c1a3a"
      color="white"
      style={{
        padding: '80px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1" align="center">
        Apps like Trade Republic and other direct brokers make investing easier
        and easier. The stock market is now accessible to everyone. Even so,
        many individuals do not have access to tools to make informed and
        informed investment decisions. Current solutions are often confusing and
        tailored to professional investors. This is exactly where we attack.
      </Typography>
    </Box>
    <Box>
      <Grid container direction="row" justify="space-evenly">
        <Grid item>
          <ProfileCard
            name="Linda"
            title="CO-FOUNDER"
            content="Ich bin Social Entrepreneur. "
            img={linda}
          />
        </Grid>
        <Grid item>
          <ProfileCard
            name="Chris"
            title="CO-FOUNDER"
            content="Ich bin Networker."
            img={chris}
          />
        </Grid>
        <Grid item>
          <ProfileCard
            name="Julien"
            title="CO-FOUNDER"
            content="Ich bin Stratege."
            img={julien}
          />
        </Grid>
      </Grid>
    </Box>
    <LogoCard />
  </Box>
);

export default AboutUs;
