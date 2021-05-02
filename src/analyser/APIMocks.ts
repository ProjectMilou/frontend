/**
 * This module contains mocks for objects that are usually fetched from the API
 * for use in tests. These mocks are required by multiple tests, but should not
 * be used outside of tests. Ideally, the mocks would be in 'APIClient.test.ts',
 * but including a test file from other files causes the test script to execute
 * the tests multiple times. This mock data structure is the same with portfolio
 * mock data structure.
 *
 * TL;DR: Never import this file, except for tests.
 * This file was initially based on portfolio mock file
 */

import { Stock } from './APIClient';

export const MockOverview: Stock = {
  symbol: 'IBM',
  isin: 'US8566568478',
  wkn: '188585',
  name: 'International Business Machines Corporation',
  price: 138.16,
  per1d: 1.038,
  per30d: 1.058,
  per7d: 1.053,
  per365d: 1.108,
  marketCapitalization: 118955229184,
  analystTargetPrice: 139.18,
  valuation: 21,
  growth: 0,
  div: 6.51,
  currency: 'USD',
  country: 'USA',
  industry: 'Information Technology Services',
  picture: new URL('https://finnhub.io/api/logo?symbol=IBM'),
  date: new Date(
    0
  ),
  mcSize: 'large',
};
export const MockOverviewTwo: Stock = {
  symbol: 'APPL',
  isin: 'US8566568478',
  wkn: '188585',
  name: 'International Business Machines Corporation',
  price: 138.16,
  per1d: 1.038,
  per30d: 1.058,
  per7d: 1.053,
  per365d: 1.108,
  marketCapitalization: 118955229184,
  analystTargetPrice: 139.18,
  valuation: 21,
  growth: 0,
  div: 6.51,
  currency: 'USD',
  country: 'USA',
  industry: 'Information Technology Services',
  picture: new URL('https://finnhub.io/api/logo?symbol=IBM'),
  date: new Date(
    0
  ),
  mcSize: 'large',
};
