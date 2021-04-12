import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HotelIcon from '@material-ui/icons/Hotel';
import Grid from '@material-ui/core/Grid';

const DetailsVolatilityGraph: React.FC = () => {
  const useStyles = makeStyles({
    line: {
      width: '90%',
      height: '5px',
      margin: 'auto',
      'background-color': 'black',
      position: 'relative',
    },
    lineMiddle: {
      height: '25px',
      width: '100px',
      'background-color': 'orange',
      margin: 'auto',
      'margin-top': '5%',
    },
    lineMiddleDynamic: {
      position: 'absolute',
      height: '20px',
      width: '5px',
      'background-color': 'red',
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <HotelIcon />
        <div className={classes.line}>
          <div className={classes.lineMiddle}>Market Avg</div>
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: Math.round((1.0304461557501514 / 2.0) * 1000) / 10,
            }}
          />
        </div>
        <FlashOnIcon />
      </Grid>
    </>
  );
};

export default DetailsVolatilityGraph;
