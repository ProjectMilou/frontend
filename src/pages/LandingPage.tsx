import React from 'react';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import MoneyIcon from '@material-ui/icons/Money';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import analyse from '../assets/images/analyse.png';
import lernen from '../assets/images/lernen.png';
import portfolio from '../assets/images/Portfolio.png';
import LogoCard from '../components/shell/landingPage/LogoCard';
import Card from '../components/shell/landingPage/Card';
import GridRowContainer from '../components/shell/landingPage/GridRowContainer';
import InfoCard from '../components/shell/landingPage/InfoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaSmall: {
      maxWidth: '450px',
      maxHeight: '250px',
      display: 'auto',
      objectFit: 'scale-down',
      padding: '20px',
    },
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
    divider: {
      light: false,
      variant: 'middle',
      marginLeft: '250px',
      marginRight: '250px',
      height: '1px',
      background: theme.palette.secondary.contrastText,
    },
    box1: {
      paddingInline: '50px',
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    typographyMain: {
      color: theme.palette.primary.dark,
      fontSize: '24px',
      marginLeft: '120px',
      marginRight: '120px',
    },
    boxMain: {
      paddingInline: '50px',
      marginBlock: '100px',
      backgroundColor: theme.palette.primary.contrastText,
    },
    gridItem: {
      paddingInline: '0px',
    },
    smallIcon: {
      fontSize: '54px',
      color: theme.palette.secondary.light,
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
    box: {
      backgroundColor: theme.palette.primary.main,
      padding: '80px',
      marginBottom: '60px',
      display: 'flex',
      justifyContent: 'center',
    },
    typography: {
      color: '#50aaff',
      fontWeight: 'bold',
      padding: '20px',
    },
    button: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: '10px',
      color: theme.palette.primary.contrastText,
      textTransform: 'none',
    },
    title: {
      fontWeight: 'bold',
      padding: '16px',
    },
  })
);

const LandingPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  return (
    <Box>
      <Card />
      <Divider className={classes.divider} />
      <Box className={classes.box1}>
        <Typography
          variant="body1"
          align="center"
          className={classes.typographyMain}
        >
          Apps like Trade Republic and other direct brokers make investing
          easier and easier. The stock market is now accessible to everyone.
          Even so, many individuals do not have access to tools to make informed
          and informed investment decisions. Current solutions are often
          confusing and tailored to professional investors. This is exactly
          where we attack.
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.boxMain}>
        <Grid
          container
          direction="column"
          justify-content="center"
          justify="center"
          alignItems="center"
          spacing={10}
        >
          <GridRowContainer
            image={lernen}
            title="LEARN"
            content="No prior knowledge is necessary for us. Whether you are a professional or a beginner, we will accompany you throughout the entire investment lifecycle and help you to be a successful investor. With our free academy, you can easily build up your knowledge of finances and deepen it."
            classNameImage={classes.mediaSmall}
            classNameGrid={classes.gridItem}
            type="even"
            titleClass={`${classes.warning} ${classes.title}`}
          />
          <GridRowContainer
            image={analyse}
            title="ANALYSIS"
            content="Do you feel ready for your first investment or are you interested in the development of different stocks? Perfect! Our analysis tool helps you to conduct investment research. Regardless of whether you want to invest in stocks or ETFs: Here you will find the most important things clearly and understandably!"
            classNameImage={classes.mediaSmall}
            classNameGrid={classes.gridItem}
            type="odd"
            titleClass={`${classes.error} ${classes.title}`}
          />

          <GridRowContainer
            image={portfolio}
            title="PORTFOLIO"
            content="It is also important to us that you build your portfolio with a good risk-return ratio. Our tool helps you to achieve optimal diversification in order to reduce your risk. In doing so, we are guided by the current scientific standards of portfolio theory."
            classNameImage={classes.mediaSmall}
            classNameGrid={classes.gridItem}
            type="even"
            titleClass={`${classes.success} ${classes.title}`}
          />
        </Grid>
      </Box>

      <Box bgcolor="#0c1a3a" color="white" px={20} pt={4} pb={18}>
        <Grid container direction="column" spacing={2}>
          <Grid item spacing={2}>
            <Typography variant="h3">Did you know...</Typography>
          </Grid>
          <Grid item container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <MoneyIcon className={classes.smallIcon} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                ..to be a successful investor, initially, you{' '}
                <span className={classes.span}>need no assets</span> . You can
                start investing with as little as 25 euros a month.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <LoyaltyIcon className={classes.smallIcon} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                ..we only work with{' '}
                <span className={classes.span}>commission-free products</span>,
                stocks and ETFs. This ensures that we pursue the{' '}
                <span className={classes.span}>same interests </span>
                as you, namely to make you a successful investor.
              </Typography>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <Typography
              variant="h3"
              align="center"
              style={{ fontWeight: 'bold', marginTop: '64px' }}
            >
              Milou accompanies you on all your financial adventures.
            </Typography>
          </Grid>
          <Grid item container direction="column">
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: '16px', marginBottom: '32px' }}
            >
              We help you to make well-founded investment decisions yourself.
            </Typography>
            <div style={{ margin: 'auto' }}>
              <Button
                href="/analyser"
                style={{
                  backgroundColor: '#FFC43B',
                  color: 'white',
                }}
              >
                Start for free
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <InfoCard />
      <LogoCard />
    </Box>
  );
};

export default LandingPage;
