/**
 * This module contains mocks for objects that are usually fetched from the API
 * for use in tests. These mocks are required by multiple tests, but should not
 * be used outside of tests. Ideally, the mocks would be in 'APIClient.test.ts',
 * but including a test file from other files causes the test script to execute
 * the tests multiple times.
 *
 * TL;DR: Never import this file, except for tests.
 */

import {
  Analytics,
  Correlations,
  KeyFigures,
  NonEmptyPortfolioDetails,
  PortfolioOverview,
  Position,
  RiskAnalysis,
} from './APIClient';

export const MockOverview: PortfolioOverview = {
  id: '1',
  name: 'test',
  virtual: true,
  positionCount: 3,
  value: 9,
  score: 1,
  perf7d: -1.23,
  perf1y: 13.37,
  modified: new Date(0),
};

export const MockOverviewTwo: PortfolioOverview = {
  id: '2',
  name: 'testTwo',
  virtual: false,
  positionCount: 4,
  value: 174.98,
  score: 0.6,
  perf7d: 0,
  perf1y: -1,
  modified: new Date(1616086585),
};

// moved from Details.tsx
export const MockPositions: Position[] = [
  {
    stock: {
      symbol: 'BMW',
      name: 'BMW',
      price: 23.25,
      perf7d: -1,
      perf1y: 5,
      country: 'Germany',
      industry: 'Auto',
      currency: 'EUR',
      score: 0.7,
    },
    qty: 1,
    totalReturn: 6.5,
    totalReturnPercent: 25,
  },
  {
    stock: {
      symbol: 'MRC',
      name: 'Mercedes',
      price: 19.51,
      perf7d: 3,
      perf1y: -15,
      country: 'Germany',
      industry: 'Auto',
      currency: 'EUR',
      score: 0.4,
    },
    qty: 2,
    totalReturn: -2.21,
    totalReturnPercent: -10.03,
  },
  {
    stock: {
      symbol: 'MCL',
      name: 'McLaren',
      price: 12.11,
      perf7d: 15,
      perf1y: 10,
      country: 'Germany',
      industry: 'Auto',
      currency: 'EUR',
      score: 0.8,
    },
    qty: 3,
    totalReturn: 3.21,
    totalReturnPercent: 34.32,
  },
  {
    stock: {
      symbol: 'QQQ',
      name: 'QQQ',
      price: 120.11,
      perf7d: 1,
      perf1y: 2,
      country: 'USA',
      industry: 'Tech',
      currency: 'USD',
      score: 0.9,
    },
    qty: 4,
    totalReturn: -1.23,
    totalReturnPercent: -0.97,
  },
];

const MockRisk: RiskAnalysis = {
  countries: {
    count: 2,
    score: 0.1,
    warnings: [
      'Strong focus on two countries',
      'Strong focus on western world',
    ],
  },
  segments: { count: 2, score: 0.4, warnings: ['c', 'd'] },
  currency: { count: 3, score: 0.8, warnings: ['e', 'f', 'g'] },
};

const MockFigures: KeyFigures[] = [
  {
    year: 1,
    pte: 10,
    ptb: 8,
    ptg: 2,
    eps: 1,
    div: 5,
    dividendPayoutRatio: 25,
  },
];

export const MockCorrelations: Correlations = {
  'BMW;Apple': 1,
  'Apple;TUM': 2,
  'Apple;Faber': 3,
  'TUM;BMW': 4,
  'BMW;Faber': 5,
  'Faber;TUM': 6,
};

export const MockAnalytics: Analytics = {
  volatility: 1.45,
  standardDeviation: 0.12,
  sharpeRatio: 0.45,
  treynorRatio: 1.2,
  debtEquity: 0.55,
  correlations: MockCorrelations,
};

export const MockDetails: NonEmptyPortfolioDetails = {
  overview: MockOverviewTwo,
  positions: MockPositions,
  risk: MockRisk,
  keyFigures: MockFigures,
  nextDividend: new Date(0),
  dividendPayoutRatio: 0.25,
  totalReturn: 75.43,
  totalReturnPercent: 12.34,
  analytics: MockAnalytics,
};
