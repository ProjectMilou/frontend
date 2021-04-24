import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import KeyFiguresBar from '../shared/KeyFiguresBar';
import { KeyFigures } from '../../portfolio/APIClient';

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
    },
  })
);

// type declarations
type DetailsMainKeyFiguresProps = {
  figures: KeyFigures[];
};

// returns the details page header
const DetailsMainKeyFigures: React.FC<DetailsMainKeyFiguresProps> = ({
  figures,
}) => {
  const classes = useStyles();

  const keyFigures = {
    PER: figures.map((f) => f.pte),
    PBR: figures.map((f) => f.ptb),
    PEGR: figures.map((f) => f.ptg),
    EPS: figures.map((f) => f.eps),
  };

  return (
    <div className={classes.figureWrapper}>
      <KeyFiguresBar
        chartHeight={350}
        keyFigures={keyFigures}
        years={figures.map((f) => f.year)}
        dark
      />
    </div>
  );
};

export default DetailsMainKeyFigures;
