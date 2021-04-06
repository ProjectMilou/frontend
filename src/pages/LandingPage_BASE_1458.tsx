import React from 'react';
import {
  Button,
  Container,
  Box,
  CardMedia,
  Grid,
  Typography,
  createMuiTheme,
  Icon,
  Divider,
  GridList,
  GridListTile,
  TextField,
  InputLabel,
  Input,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { addSyntheticLeadingComment } from 'typescript';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#415176',
      main: '#122654',
      dark: '#0c1a3a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#df4f9b',
      main: '#D72483',
      dark: '#96195b',
      contrastText: '#000',
    },
  },
});

const LandingPage: React.FC = () => (
  <Container>
    <Box>
      <Box
        style={{ background: '#0c1a3a', marginLeft: 0, display: 'flex' }}
        m={8}
        width={1}
        justifyContent="center"
      >
        <Grid container direction="column" alignItems="center" wrap="nowrap">
          <Grid item>
            <img
              src="https://getmilou.de/wp-content/uploads/elementor/thumbs/2020-12-15-Logo-hell-p17eq5ztwznwc003uog4y2jecjf0xlb7ut5p5vmfus.png"
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

      <Divider />
      <Typography variant="body1">
        Apps like Trade Republic and other direct brokers make investing easier
        and easier. The stock market is now accessible to everyone. Even so,
        many individuals do not have access to tools to make informed and
        informed investment decisions. Current solutions are often confusing and
        tailored to professional investors. This is exactly where we attack.
      </Typography>

      <Divider />

      <Grid
        container
        spacing={4}
        justify-content="center"
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <img
            width="750"
            height="635"
            src="https://getmilou.de/wp-content/uploads/2021/01/lernen.png"
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            sizes="(max-width: 444px) 100vw, 444px"
          />
        </Grid>

        <Grid
          item
          xs
          container
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <Typography variant="h4">LEARN</Typography>
          <Typography variant="body1" align="center">
            No prior knowledge is necessary for us. Whether you are a
            professional or a beginner, we will accompany you throughout the
            entire investment lifecycle and help you to be a successful
            investor. With our free academy, you can easily build up your
            knowledge of finances and deepen it.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        justify-content="center"
        direction="row"
        alignItems="center"
      >
        <Grid
          item
          xs
          container
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <Typography variant="h4">ANALYSIS</Typography>
          <Typography variant="body1" align="center">
            Do you feel ready for your first investment or are you interested in
            the development of different stocks? Perfect! Our analysis tool
            helps you to conduct investment research. Regardless of whether you
            want to invest in stocks or ETFs: Here you will find the most
            important things clearly and understandably!
          </Typography>
        </Grid>
        <Grid item>
          <img
            width="750"
            height="635"
            src="https://getmilou.de/wp-content/uploads/2021/01/analyse.png"
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            sizes="(max-width: 750px) 100vw, 750px"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        justify-content="center"
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <img
            width="750"
            height="732"
            src="https://getmilou.de/wp-content/uploads/2021/01/Portfolio.png"
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            sizes="(max-width: 750px) 100vw, 750px"
          />
        </Grid>
        <Grid
          item
          xs
          container
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <Typography variant="h4">PORTFOLIO</Typography>
          <Typography variant="body1" align="center">
            It is also important to us that you build your portfolio with a good
            risk-return ratio. Our tool helps you to achieve optimal
            diversification in order to reduce your risk. In doing so, we are
            guided by the current scientific standards of portfolio theory.
          </Typography>
        </Grid>
      </Grid>
    </Box>

    <Box maxWidth="xl">
      <div
        style={{
          backgroundColor: '#0c1a3a',
        }}
      >
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Typography variant="h3">Did you know...</Typography>
          </Grid>
          <Grid item xs={2} container>
            <Icon className="fas fa-money-bill-alt" fontSize="large" />
          </Grid>
          <Grid item alignItems="center">
            <Typography variant="h2" align="center">
              Milou accompanies you on all your financial adventures.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              We help you to make well-founded investment decisions yourself.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Start for free</Button>
          </Grid>
        </Grid>
      </div>
    </Box>

    <Box>
      <Grid container direction="row" spacing={4}>
        <Grid item>
          <img
            width="501"
            height="732"
            src="https://getmilou.de/wp-content/uploads/2021/01/Mockups-Lifecycle.png"
            className="attachment-full size-full"
            alt=""
            loading="lazy"
            srcSet="https://getmilou.de/wp-content/uploads/2021/01/Mockups-Lifecycle.png 501w, https://getmilou.de/wp-content/uploads/2021/01/Mockups-Lifecycle-205x300.png 205w"
            sizes="(max-width: 501px) 100vw, 501px"
          />
        </Grid>
        <Grid
          item
          xs
          container
          direction="column"
          spacing={8}
          alignItems="center"
          justify-content="center"
        >
          <Grid item container direction="row">
            <Grid item>
              <Icon className="fas fa-chart-line" />
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
          <Grid item container direction="row">
            <Grid item>
              <Icon className="fas fa-chart-line" />
            </Grid>
            <Grid item xs container spacing={4} direction="column">
              <Typography variant="h5">INFO BOXES</Typography>
              <Typography variant="body1">
                With the help of our info boxes, you can also view explanations
                of key figures and values in the app at any time and acquire
                knowledge.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item>
              <Icon className="fas fa-chart-line" />
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
          <Grid item container direction="row">
            <Grid item>
              <Icon aria-hidden="true" className="fas fa-chart-line" />
            </Grid>
            <Grid item xs container spacing={4} direction="column">
              <Typography variant="h5">RISK WARNING</Typography>
              <Typography variant="body1">
                Identify risks across your entire portfolio with simple warnings
                and learn how to counteract them.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box bgcolor="#0c1a3a" color="white">
        <Grid container>
          <Grid item xs container direction="column" alignItems="center">
            <Typography variant="h3">Our supporters</Typography>
            <Typography variant="body1">Thank you for your help!</Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <GridList cols={5} cellHeight={120}>
            <GridListTile>
              <img
                style={{ maxWidth: '100%', maxHeight: '80px' }}
                src="https://getmilou.de/wp-content/uploads/2021/01/180-breit.png"
                className="attachment-large size-large"
                alt=""
                loading="lazy"
              />
            </GridListTile>
            <GridListTile>
              <img
                style={{ maxWidth: '100%', maxHeight: '80px' }}
                src="https://getmilou.de/wp-content/uploads/2020/12/getThumb.gif"
                className="attachment-large size-large"
                alt=""
                loading="lazy"
              />
            </GridListTile>
            <GridListTile>
              <img
                style={{ maxWidth: '100%', maxHeight: '80px' }}
                src="https://getmilou.de/wp-content/uploads/elementor/thumbs/utum-logo-p1cihxdutlig1amolrz3ugtzva59uu0j3023656wvc.png"
                title="utum logo"
                alt="utum logo"
              />
            </GridListTile>
            <GridListTile>
              <img
                style={{ maxWidth: '100%', maxHeight: '80px' }}
                src="https://getmilou.de/wp-content/uploads/2021/01/tech-talents.png"
                className="attachment-large size-large"
                alt=""
                loading="lazy"
              />
            </GridListTile>
            <GridListTile>
              <img
                style={{ maxWidth: '100%', maxHeight: '80px' }}
                src="https://getmilou.de/wp-content/uploads/2021/01/start.png"
                className="attachment-large size-large"
                alt=""
                loading="lazy"
                srcSet="https://getmilou.de/wp-content/uploads/2021/01/start.png 507w, https://getmilou.de/wp-content/uploads/2021/01/start-300x137.png 300w"
              />
            </GridListTile>
          </GridList>
        </Grid>
      </Box>
      <Box>
        <Grid container direction="row">
          <Grid item xs container direction="column">
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
              <div>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
);

export default LandingPage;
