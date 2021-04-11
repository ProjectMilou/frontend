/**
 * Credits to Portfolio team for introducing MockOverviews.
 *
 * This module contains mocks for objects that are usually fetched from the API
 * for use in tests. These mocks are required by multiple tests, but should not
 * be used outside of tests. Ideally, the mocks would be in 'APIClient.test.ts',
 * but including a test file from other files causes the test script to execute
 * the tests multiple times.
 *
 * TL;DR: Never import this file, except for tests.
 * Framwork similar to portfolio team
 */

import { Stock } from './APIClient';

export const MockOverview: Stock = {
  symbol: 'IBM',
  isin: 'US4592001014',
  wkn: '851399',
  name: 'International Business Machines Corporation',
  price: 175.29,
  per1d: 2.25,
  per7d: 1.52,
  per30d: 0.92,
  per365d: 40.3,
  marketCapitalization: 114263867392,
  analystTargetPrice: 137,
  valuation: 20.6803,
  growth: 1.5,
  div: 0.0508,
  currency: 'USD',
  country: 'USA',
  industry: 'Consumer Electronics',
  picture: new URL(
    'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  ),
  date: new Date('2021-03-23T18:25:43.511Z'),
};

export const MockOverviewTwo: Stock = {
  symbol: 'AAPL',
  isin: 'US0378331005',
  wkn: '865985',
  name: 'Apple Inc',
  price: 252.19,
  per1d: 1.79,
  per7d: 1.52,
  per30d: 0.92,
  per365d: 30.3,
  marketCapitalization: 172637867392,
  analystTargetPrice: 290.24,
  valuation: 27.6803,
  growth: 3.2,
  div: 0.1208,
  currency: 'USD',
  country: 'USA',
  industry: 'Information Technology Services',
  picture: new URL(
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
  ),
  date: new Date('2021-03-23T18:25:43.511Z'),
};
