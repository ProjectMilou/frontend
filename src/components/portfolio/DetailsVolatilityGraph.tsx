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
      display: 'flex',
    },
    lineMiddle: {
      height: '20px',
      width: '3px',
      'background-color': 'red',
      margin: 'auto',
    },
    lineMiddleDynamic: {
      position: 'absolute',
      height: '20px',
      width: '3px',
      'background-color': 'white',
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <HotelIcon />
        <div className={classes.line}>
          <div className={classes.lineMiddle} />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((1.0304461557501514 / 2.0) * 1000) / 10}%`,
            }}
          />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((0.5496680733681532 / 2.0) * 1000) / 10}%`,
            }}
          />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((0.5993856976545141 / 2.0) * 1000) / 10}%`,
            }}
          />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((0.5765889119578946 / 2.0) * 1000) / 10}%`,
            }}
          />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((0.7140162113218156 / 2.0) * 1000) / 10}%`,
            }}
          />
          <div
            className={classes.lineMiddleDynamic}
            style={{
              left: `${Math.round((0.6486754881067324 / 2.0) * 1000) / 10}%`,
            }}
          />
        </div>
        <FlashOnIcon />
      </Grid>
    </>
  );
};

export default DetailsVolatilityGraph;
