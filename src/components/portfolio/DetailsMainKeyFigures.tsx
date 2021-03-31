import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { KeyFigures } from './DetailsTypes';

// stylesheet for the key figure section
const useStyles = makeStyles(() =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    figureWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
  })
);

// type declarations
type DetailsMainKeyFiguresProps = {
  figures: KeyFigures[];
};

// returns the details page header
const DetailsMainKeyFigures: React.FC<DetailsMainKeyFiguresProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.figureWrapper}>
      {/* body placeholder */}
      <div />
    </div>
  );
};

export default DetailsMainKeyFigures;
