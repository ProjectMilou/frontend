import React from 'react';
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import ProfileCard from '../components/shell/landingPage/ProfileCard';
import LogoCard from '../components/shell/landingPage/LogoCard';

import linda from '../assets/images/linda.png';
import chris from '../assets/images/chris.png';
import julien from '../assets/images/julien.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxClass: {
      paddingInline: theme.spacing(13),
      maxWidth: theme.spacing(175),
      margin: 'auto',
    },
  })
);

const AboutUs: React.FC<RouteComponentProps> = () => {
  const theme = useTheme();
  const { boxClass } = useStyles(theme);

  return (
    <Box>
      <Box pt={4} pb={6}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              align="center"
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              Our Team
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" className={boxClass}>
              Apps like Trade Republic and other direct brokers make investing
              easier and easier. The stock market is now accessible to everyone.
              Even so, many individuals do not have access to tools to make
              informed and informed investment decisions. Current solutions are
              often confusing and tailored to professional investors. This is
              exactly where we attack.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        bgcolor="#0c1a3a"
        color="white"
        py={12}
        m="auto"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" align="center" className={boxClass}>
          Apps like Trade Republic and other direct brokers make investing
          easier and easier. The stock market is now accessible to everyone.
          Even so, many individuals do not have access to tools to make informed
          and informed investment decisions. Current solutions are often
          confusing and tailored to professional investors. This is exactly
          where we attack.
        </Typography>
      </Box>
      <Box className={boxClass}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
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
};

export default AboutUs;
