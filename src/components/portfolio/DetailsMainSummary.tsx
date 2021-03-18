import React from 'react';
import { makeStyles } from '@material-ui/core';

// stylesheet for the header component
const useStyles = makeStyles({});

// returns the details page header
const DetailsMainSummary: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div>
          <h1>Summary</h1>
        </div>
        <div>
          <hr />
        </div>
      </div>
      <div>{/* Summary box */}</div>
      <div>{/* Summary pie */}</div>
      <div>{/* Summary line */}</div>
    </div>
  );
};

export default DetailsMainSummary;
