import React from 'react';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  Box,
  Grid,
  Typography,
  GridListTile,
  Divider,
  GridList,
  Input,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import MoneyIcon from '@material-ui/icons/Money';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import InfoIcon from '@material-ui/icons/Info';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WarningIcon from '@material-ui/icons/Warning';

import Card from './components/Card';
import Media from './components/Media';
import GridRowContainer from './components/GridRowContainer';
import img from '../assets/images/180.png';
import img1 from '../assets/images/getThumb.gif';
import img2 from '../assets/images/media2.png';
import img3 from '../assets/images/start.png';
import img4 from '../assets/images/tech-talents.png';
import img5 from '../assets/images/tumlogo.png';
import manage from '../assets/images/manage.png';
import analyse from '../assets/images/analyse.png';
import lernen from '../assets/images/lernen.png';
import portfolio from '../assets/images/Portfolio.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media1: {
      maxWidth: '480px',
      maxHeight: '396px',
      display: 'auto',
      objectFit: 'scale-down',
      padding: '100px',
    },
    media2: {
      width: '500px',
      height: '732px',
      padding: '50px',
      objectFit: 'scale-down',
    },
    logos: {
      maxWidth: '200px',
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
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    typography1: {
      color: theme.palette.primary.dark,
      fontSize: '24px',
      marginLeft: '120px',
      marginRight: '120px',
    },
    boxMain: {
      paddingLeft: '180px',
      paddingRight: '180px',
      backgroundColor: theme.palette.primary.contrastText,
    },
    gridItem: {
      paddingInline: '100px',
    },
    smallIcon: {
      fontSize: '54px',
      color: theme.palette.secondary.light,
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
          className={classes.typography1}
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
        <Box style={{ paddingBlock: '40px' }}>
          <GridRowContainer
            image={lernen}
            title="LEARN"
            content="No prior knowledge is necessary for us. Whether you are a professional or a beginner, we will accompany you throughout the entire investment lifecycle and help you to be a successful investor. With our free academy, you can easily build up your knowledge of finances and deepen it."
            classNameImage={classes.media1}
            classNameGrid={classes.gridItem}
            type="even"
            titleClass={`${classes.warning} ${classes.title}`}
          />
          <GridRowContainer
            image={analyse}
            title="ANALYSIS"
            content="Do you feel ready for your first investment or are you interested in the development of different stocks? Perfect! Our analysis tool helps you to conduct investment research. Regardless of whether you want to invest in stocks or ETFs: Here you will find the most important things clearly and understandably!"
            classNameImage={classes.media1}
            classNameGrid={classes.gridItem}
            type="odd"
            titleClass={`${classes.error} ${classes.title}`}
          />

          <GridRowContainer
            image={portfolio}
            title="PORTFOLIO"
            content="It is also important to us that you build your portfolio with a good risk-return ratio. Our tool helps you to achieve optimal diversification in order to reduce your risk. In doing so, we are guided by the current scientific standards of portfolio theory."
            classNameImage={classes.media1}
            classNameGrid={classes.gridItem}
            type="even"
            titleClass={`${classes.success} ${classes.title}`}
          />
        </Box>
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

      <Box className={classes.boxMain} display="flex">
        <Grid
          container
          direction="row"
          spacing={4}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Media image={img2} className={classes.media2} />
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={4}
            alignItems="center"
            justify-content="center"
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <CastForEducationIcon
                  className={`${classes.success} ${classes.largeIcon}`}
                />
              </Grid>
              <Grid item xs container direction="column">
                <Typography variant="h5">LEARNING PLATFORM</Typography>
                <Typography variant="body1">
                  Our learning journey picks you up where you are. With our
                  short tutorials you can acquire new knowledge within a very
                  short time and thus become an investor yourself.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <InfoIcon
                  className={`${classes.warning} ${classes.largeIcon}`}
                />
              </Grid>
              <Grid item xs container direction="column">
                <Typography variant="h5">INFO BOXES</Typography>
                <Typography variant="body1">
                  With the help of our info boxes, you can also view
                  explanations of key figures and values in the app at any time
                  and acquire knowledge.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={4}
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
            >
              <Grid item>
                <WarningIcon
                  className={`${classes.error} ${classes.largeIcon}`}
                />
              </Grid>
              <Grid item xs container direction="column">
                <Typography variant="h5">RISK WARNING</Typography>
                <Typography variant="body1">
                  Identify risks across your entire portfolio with simple
                  warnings and learn how to counteract them.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box bgcolor="#0c1a3a" color="white" py={8}>
        <Grid container>
          <Grid item xs container direction="column" alignItems="center">
            <Typography variant="h3">Our supporters</Typography>
            <Typography variant="body1" gutterBottom>
              Thank you for your help!
            </Typography>
          </Grid>
        </Grid>
        <Box py={8}>
          <Grid container item alignItems="center" justify="center">
            <GridList cols={6} cellHeight={120} spacing={18}>
              <GridListTile>
                <Media image={img} className={classes.logos} />
              </GridListTile>
              <GridListTile>
                <Media image={img1} className={classes.logos} />
              </GridListTile>
              <GridListTile>
                <Media image={img5} className={classes.logos} />
              </GridListTile>
              <GridListTile>
                <Media image={manage} className={classes.logos} />
              </GridListTile>
              <GridListTile>
                <Media image={img4} className={classes.logos} />
              </GridListTile>
              <GridListTile>
                <Media image={img3} className={classes.logos} />
              </GridListTile>
            </GridList>
          </Grid>
        </Box>
      </Box>
      <Box py={16} px={8}>
        <Grid container direction="row">
          <Grid item xs={6} container direction="column">
            <Typography variant="h4">Stay informed.</Typography>
            <Typography variant="body1">
              Sign-up for our newsletter to get more information and stay in
              contact.
            </Typography>
          </Grid>
          <Grid item>
            <form noValidate>
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <div>
                <Input placeholder="Email Address" required />
              </div>
              <div style={{ marginTop: '6px' }}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;
