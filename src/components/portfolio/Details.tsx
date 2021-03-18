import React from 'react';
import { makeStyles } from '@material-ui/core';
import DetailsHeader from './DetailsHeader';

// stylesheet for the details base component
const useStyles = makeStyles({
  topBanner: {
    backgroundColor: '#EEF1FB',
    width: '100%',
    height: '15rem',
  },
  main: {
    backgroundColor: '#0d1b3b',
    width: '100%',
    height: '15rem',
  },
});

// type declaration of the details base components props
export type DetailsProps = {
  // function to return to the dashboard
  back: () => void;
  // name of the portfolio
  name: string;
};

// functional component that takes the name of the portfolio and a function to switch back to the dashboard
// returns the details page
const Details: React.FC<DetailsProps> = ({ back, name }) => {
  const classes = useStyles();

  return (
    <div>
      <section className={classes.topBanner}>
        <DetailsHeader back={back} name={name} />
      </section>
      <section className={classes.main}>
        <div />
      </section>
    </div>
  );
};

export default Details;
