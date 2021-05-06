import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    barContainer: {
      position: 'relative',
      width: '90%',
      height: '3rem',
      margin: '1rem auto',
      background:
        'linear-gradient(90deg, rgba(204,0,0,0.9) 0%, rgba(218,150,0,0.9) 50%, rgba(0,187,9,0.9) 100%)',
      borderRadius: '0.5rem',
    },
  })
);

/**
 * A red to green gradient bar that wraps AnalystBarIndicators
 *
 * @param children - Children in form of AnalystBarIndicators
 */

// this component is a wrapper (with the gradient color) for the bar indicators
const AnalystBar: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.barContainer}>{children}</div>;
};

export default AnalystBar;
