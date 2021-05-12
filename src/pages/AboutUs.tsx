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

import leia from '../assets/images/leia.jpeg';
import yoda from '../assets/images/yoda.jpeg';
import luke from '../assets/images/luke.jpeg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxClass: {
      paddingInline: theme.spacing(10),
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
              name="Luke"
              title="The good guy"
              content="No One's Ever Really Gone."
              img={luke}
              email=""
              linkedinLink=""
            />
          </Grid>
          <Grid item>
            <ProfileCard
              name="Leia"
              title="Princess"
              content="Pew pew!"
              img={leia}
              email=""
              linkedinLink=""
            />
          </Grid>
          <Grid item>
            <ProfileCard
              name="Yoda"
              title="Jedi"
              content="Funny, this should be."
              img={yoda}
              email=""
              linkedinLink=""
            />
          </Grid>
        </Grid>
      </Box>
      <LogoCard />
    </Box>
  );
};

export default AboutUs;
