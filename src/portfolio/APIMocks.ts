/**
 * This module contains mocks for objects that are usually fetched from the API
 * for use in tests. These mocks are required by multiple tests, but should not
 * be used outside of tests. Ideally, the mocks would be in 'APIClient.test.ts',
 * but including a test file from other files causes the test script to execute
 * the tests multiple times.
 *
 * TL;DR: Never import this file, except for tests.
 */

import { PortfolioOverview } from './APIClient';

export const MockOverview: PortfolioOverview = {
  id: '1',
  name: 'test',
  virtual: true,
  positionCount: 3,
  value: 9,
  score: undefined,
  perf7d: -1.23,
  perf1y: 13.37,
  modified: new Date(0),
};

export const MockOverviewTwo: PortfolioOverview = {
  id: '2',
  name: 'testTwo',
  virtual: false,
  positionCount: 4,
  value: 3,
  score: 20,
  perf7d: 0,
  perf1y: -1,
  modified: new Date(1616086585),
};
