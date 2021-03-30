import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import DetailsMainSummary from './DetailsMainSummary';
import DetailsMainPositions from './DetailsMainPositions';
import DetailsMainKeyFigures from './DetailsMainKeyFigures';
import DetailsMainDividens from './DetailsMainDividends';
import DetailsMainAnalyst from './DetailsMainAnalyst';
import { RiskAnalysis, Position, KeyFigures } from './DetailsTypes';

// stylesheet for the body of the details page
const useStyles = makeStyles(() =>
  createStyles({
    mainWrapper: {
      // TODO use theme margin
      margin: '0 auto',
      padding: '0 4rem',
      // TODO: use theme max-width
      maxWidth: '80rem',
    },
    sectionWrapper: {
      padding: '2rem 0',
    },
  })
);

// type declarations
type DetailsMainProps = {
  positionCount: number;
  value: number;
  score: number;
  perf7d: number;
  perf1y: number;
  risk: RiskAnalysis;
  positions: Position[];
  figures: KeyFigures[];
  nextDividend: number;
  dividendPayoutRatio: number;
};

// returns the main body of the details page and all subcomponents
const DetailsMain: React.FC<DetailsMainProps> = ({
  positionCount,
  value,
  score,
  perf1y,
  perf7d,
  risk,
  positions,
  figures,
  nextDividend,
  dividendPayoutRatio,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.sectionWrapper}>
        <DetailsMainSummary
          positionCount={positionCount}
          value={value}
          score={score}
          perf1y={perf1y}
          perf7d={perf7d}
          risk={risk}
          positions={positions}
        />
      </div>
      <div className={classes.sectionWrapper}>
        <DetailsMainPositions positions={positions} />
      </div>
      <div className={classes.sectionWrapper}>
        <DetailsMainKeyFigures figures={figures} />
      </div>
      <div className={classes.sectionWrapper}>
        <DetailsMainDividens
          nextDividend={nextDividend}
          dividendPayoutRatio={dividendPayoutRatio}
        />
      </div>
      <div className={classes.sectionWrapper}>
        <DetailsMainAnalyst />
      </div>
    </div>
  );
};

export default DetailsMain;