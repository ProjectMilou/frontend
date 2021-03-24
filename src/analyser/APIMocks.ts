/**
 * This module contains mocks for objects that are usually fetched from the API
 * for use in tests. These mocks are required by multiple tests, but should not
 * be used outside of tests. Ideally, the mocks would be in 'APIClient.test.ts',
 * but including a test file from other files causes the test script to execute
 * the tests multiple times.
 *
 * TL;DR: Never import this file, except for tests.
 */

import { Stock } from './APIClient';

export const MockOverview: Stock = {
  symbol: "IBM",
  ISIN: "US4592001014",
  WKN: "851399",
  name: "International Business Machines Corporation",
  price: 175.29,
  "1d": 2.25,
  "7d": 1.52,
  "30d": 0.92,
  marketCapitalization: 114263867392,
  analystTargetPrice: 137,
  valuation: 20.6803,
  growth: 1.5,
  div: 0.0508,
  currency: "USD",
  country: "USA",
  industry: "Consumer Electronics",
  picture: new URL("https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"),
  date: new Date("2021-03-23T18:25:43.511Z")
}

export const MockOverviewTwo: Stock = {
  symbol: "IBM",
  ISIN: "US4592001014",
  WKN: "851399",
  name: "International Business Machines Corporation",
  price: 175.29,
  "1d": 2.25,
  "7d": 1.52,
  "30d": 0.92,
  marketCapitalization: 114263867392,
  analystTargetPrice: 137,
  valuation: 20.6803,
  growth: 1.5,
  div: 0.0508,
  currency: "USD",
  country: "USA",
  industry: "Consumer Electronics",
  picture: new URL("https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"),
  date: new Date("2021-03-23T18:25:43.511Z"),
}
