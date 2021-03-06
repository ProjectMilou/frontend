import React from 'react';
import { RouteComponentProps } from '@reach/router';

import {
  Container,
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
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
      maxWidth: theme.spacing(56.25),
      maxHeight: theme.spacing(31.25),
      display: 'auto',
      objectFit: 'scale-down',
      padding: theme.spacing(2.5),
    },
    mediaLarge: {
      width: theme.spacing(62.5),
      height: theme.spacing(91.5),
      padding: theme.spacing(6.25),
      objectFit: 'scale-down',
    },
    icon: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
    divider: {
      light: false,
      variant: 'middle',
      marginLeft: theme.spacing(31.25),
      marginRight: theme.spacing(31.25),
      marginTop: theme.spacing(6.25),
      marginBottom: theme.spacing(6.25),
      height: '1px',
      background: theme.palette.secondary.contrastText,
    },
    box1: {
      paddingInline: theme.spacing(6.25),
      paddingTop: theme.spacing(6.25),
      paddingBottom: theme.spacing(6.25),
    },
    typographyMain: {
      color: theme.palette.primary.dark,
      fontSize: theme.spacing(3),
      maxWidth: theme.spacing(162.5),
      textAlign: 'center',
      marginLeft: theme.spacing(15),
      marginRight: theme.spacing(15),
    },
    boxMain: {
      paddingInline: theme.spacing(6.25),
      marginBlock: theme.spacing(12.5),
      backgroundColor: theme.palette.primary.contrastText,
    },
    gridItem: {
      paddingInline: theme.spacing(0),
    },
    smallIcon: {
      fontSize: theme.spacing(6.75),
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
      padding: theme.spacing(10),
      marginBottom: theme.spacing(7.5),
      display: 'flex',
      justifyContent: 'center',
    },
    typography: {
      color: '#50aaff',
      fontWeight: 'bold',
      padding: theme.spacing(2.5),
    },
    button: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: theme.spacing(1.25),
      color: theme.palette.primary.contrastText,
      textTransform: 'none',
    },
    title: {
      fontWeight: 'bold',
      padding: theme.spacing(2),
    },
  })
);

const LandingPage: React.FC<RouteComponentProps> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <Card />
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item spacing={4}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            className={classes.typographyMain}
          >
            Apps like Trade Republic and other direct brokers make investing
            easier and easier. The stock market is now accessible to everyone.
            Even so, many individuals do not have access to tools to make
            informed and informed investment decisions. Current solutions are
            often confusing and tailored to professional investors. This is
            exactly where we attack.
          </Typography>
        </Grid>
        <Grid item spacing={4}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
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
        <Container maxWidth="lg">
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={2}>
              <Typography variant="h3" style={{ padding: '8px' }}>
                Did you know...
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
              alignItems="center"
            >
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
            <Grid
              item
              container
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <LoyaltyIcon className={classes.smallIcon} />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  ..we only work with{' '}
                  <span className={classes.span}>commission-free products</span>
                  , stocks and ETFs. This ensures that we pursue the{' '}
                  <span className={classes.span}>same interests </span>
                  as you, namely to make you a successful investor.
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
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
        </Container>
      </Box>

      <InfoCard />
      <LogoCard />
    </>
  );
};

export default LandingPage;
