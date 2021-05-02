import React from 'react';
import {
  Box,
  Grid,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import InfoIcon from '@material-ui/icons/Info';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WarningIcon from '@material-ui/icons/Warning';

import img2 from '../../../assets/images/media2.png';
import Media from './Media';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaLarge: {
      width: '500px',
      height: '732px',
      padding: '50px',
      objectFit: 'scale-down',
    },
    icon: {
      width: '20px',
      height: '20px',
    },

    boxMain: {
      paddingInline: '50px',
      marginBlock: '100px',
      backgroundColor: theme.palette.primary.contrastText,
    },
    largeIcon: {
      width: '60px',
      height: '60px',
    },
    span: {
      color: theme.palette.secondary.light,
    },
    success: {
      color: theme.palette.success.main,
    },
    warning: {
      color: theme.palette.warning.main,
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

const InfoCard: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.boxMain}>
      <Grid
        container
        direction="row"
        spacing={4}
        alignItems="center"
        justify-content="center"
        justify="center"
      >
        <Grid item>
          <Media image={img2} className={classes.mediaLarge} />
        </Grid>
        <Grid
          item
          xs
          container
          direction="column"
          alignItems="center"
          justify-content="center"
          style={{ maxWidth: '600px' }}
        >
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={4}
            style={{ width: '500px', height: '180px' }}
          >
            <Grid item>
              <CastForEducationIcon
                className={`${classes.success} ${classes.largeIcon}`}
              />
            </Grid>
            <Grid item xs container direction="column">
              <Typography variant="h5">LEARNING PLATFORM</Typography>
              <Typography variant="body1">
                Our learning journey picks you up where you are. With our short
                tutorials you can acquire new knowledge within a very short time
                and thus become an investor yourself.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={4}
            style={{ width: '500px', height: '180px' }}
          >
            <Grid item>
              <InfoIcon className={`${classes.warning} ${classes.largeIcon}`} />
            </Grid>
            <Grid item xs container direction="column">
              <Typography variant="h5">INFO BOXES</Typography>
              <Typography variant="body1">
                With the help of our info boxes, you can also view explanations
                of key figures and values in the app at any time and acquire
                knowledge.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={4}
            style={{ width: '500px', height: '180px' }}
          >
            <Grid item>
              <TrendingUpIcon
                className={`${classes.span} ${classes.largeIcon}`}
              />
            </Grid>
            <Grid item xs container direction="column">
              <Typography variant="h5">SIMPLE VISUALIZATION</Typography>
              <Typography variant="body1">
                With the help of simple graphics and diagrams, you get
                information at a glance and can draw conclusions about
                individual stocks and your portfolio.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={4}
            style={{ width: '500px', height: '180px' }}
          >
            <Grid item>
              <WarningIcon
                className={`${classes.error} ${classes.largeIcon}`}
              />
            </Grid>
            <Grid item xs container direction="column">
              <Typography variant="h5">RISK WARNING</Typography>
              <Typography variant="body1">
                Identify risks across your entire portfolio with simple warnings
                and learn how to counteract them.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoCard;
