import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import DetailsHeader from './DetailsHeader';
import DetailsMain from './DetailsMain';
import {
  PortfolioDetails,
  KeyFigures,
  RiskAnalysis,
  Position,
} from './DetailsTypes';

// stylesheet for the details base component
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    topBanner: {
      backgroundColor: '#EEF1FB',
      width: '100%',
      height: '15rem',
    },
    main: {
      backgroundColor: palette.primary.main,
      width: '100%',
      height: '100%',
      // change to agreed upon minWidth
      minWidth: '50rem',
    },
  })
);

// is this even useful?
function sumPositions(pos: Position[]): number {
  return pos.map((p) => p.stock.price).reduce((a, b) => a + b);
}

// all mock data that is passed down
export const mockPositions: Position[] = [
  {
    stock: {
      isin: '0',
      symbol: 'BMW',
      name: 'BMW',
      price: 23.25,
      perf7d: -1,
      perf1y: 5,
      country: 'Germany',
      industry: 'Auto',
      score: 0.7,
    },
    qty: 1,
  },
  {
    stock: {
      isin: '1',
      symbol: 'MRC',
      name: 'Mercedes',
      price: 19.5,
      perf7d: 3,
      perf1y: -15,
      country: 'Germany',
      industry: 'Auto',
      score: 0.4,
    },
    qty: 2,
  },
  {
    stock: {
      isin: '2',
      symbol: 'MCL',
      name: 'McLaren',
      price: 12.11,
      perf7d: 15,
      perf1y: 10,
      country: 'Germany',
      industry: 'Auto',
      score: 0.8,
    },
    qty: 3,
  },
  {
    stock: {
      isin: '3',
      symbol: 'QQQ',
      name: 'QQQ',
      price: 120.11,
      perf7d: 1,
      perf1y: 2,
      country: 'USA',
      industry: 'Tech',
      score: 0.9,
    },
    qty: 4,
  },
];

const mockRisk: RiskAnalysis = {
  countries: {
    score: 0.1,
    warnings: [
      'Strong focus on two countries',
      'Strong focus on western world',
    ],
  },
  segments: { score: 0.4, warnings: ['c', 'd'] },
  currency: { score: 0.8, warnings: ['e', 'f', 'g'] },
};

const mockFigures: KeyFigures[] = [
  {
    year: 1,
    pte: 10,
    ptb: 8,
    ptg: 2,
    eps: 1,
    div: 5,
  },
];

export const mock: PortfolioDetails = {
  id: '1',
  name: 'My Portfolio',
  virtual: true,
  positionCount: 3,
  value: sumPositions(mockPositions),
  score: 0.6,
  perf7d: -2,
  perf1y: 4,
  modified: 0,
  positions: mockPositions,
  risk: mockRisk,
  keyFigures: mockFigures,
  nextDividend: 0,
  dividendPayoutRatio: 0.8,
};

// props type declaration
export type DetailsProps = {
  // function to return to the dashboard
  back: () => void;
};

// functional component that takes the name of the portfolio and a function to switch back to the dashboard
// returns the entire details page
const Details: React.FC<DetailsProps> = ({ back }) => {
  const classes = useStyles();

  return (
    <div>
      <section className={classes.topBanner}>
        <DetailsHeader
          back={back}
          name={mock.name}
          positions={mock.positions}
        />
      </section>
      <section className={classes.main}>
        <DetailsMain
          positionCount={mock.positionCount}
          value={mock.value}
          score={mock.score}
          perf7d={mock.perf7d}
          perf1y={mock.perf1y}
          risk={mock.risk}
          positions={mock.positions}
          figures={mock.keyFigures}
          nextDividend={mock.nextDividend}
          dividendPayoutRatio={mock.dividendPayoutRatio}
        />
      </section>
    </div>
  );
};

// exports
export default Details;
