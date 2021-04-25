import React from 'react';
import {
  Button,
  Box,
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import milou from '../../assets/images/milou.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundColor: theme.palette.primary.main,
      padding: '80px',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '70px',
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
  })
);

const Card: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container direction="column" alignItems="center" wrap="nowrap">
        <Grid item>
          <img
            src={milou}
            title="2020-12-15 Logo hell"
            alt="2020-12-15 Logo hell"
          />
        </Grid>
        <Grid item>
          <Typography className={classes.typography} variant="h2">
            Empower to invest.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            href="/analyser"
          >
            Start now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Card;
