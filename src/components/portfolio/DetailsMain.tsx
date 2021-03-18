import React from 'react';
import { makeStyles } from '@material-ui/core';
import DetailsMainSummary from './DetailsMainSummary';

// stylesheet for the header component
const useStyles = makeStyles({});

// returns the details page header
const DetailsMain: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <DetailsMainSummary />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
};

export default DetailsMain;
