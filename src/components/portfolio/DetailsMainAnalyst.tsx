import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// stylesheet for the analyst section
const useStyles = makeStyles(() =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    analystWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
  })
);

// type declarations
type DetailsMainAnalystProps = {
  // props
};

// returns the details page header
const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.analystWrapper}>
      {/* body placeholder */}
      <div />
    </div>
  );
};

export default DetailsMainAnalyst;
