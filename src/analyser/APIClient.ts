// Based on Portfolio API Client

import { AppError } from '../Errors';

export const baseURL = 'https://api.milou.io/stocks';
const headers = { 'Content-Type': 'application/json' };

// Stock type
export type Stock = {
  symbol: string;
  isin: string;
  wkn: string;
  name: string;
  price: number;
  per1d: number;
  per7d: number;
  per30d: number;
  per365d: number;
  marketCapitalization: number;
  analystTargetPrice: number;
  valuation: number;
  growth: number;
  div: number;
  currency: string;
  country: string;
  industry: string;
  picture: URL;
  date: Date;
};

// List of stocks
type StockList = {
  stocks: Stock[];
};

// Stock details
export type StockDetails = {
  symbol: string;
  intro: string;
  founded: number;
  website: URL;
  fullTimeEmployees: number;
  address: string;
  assenmbly: Date;
};

// Filter object
export type Filters = {
  [key: string]: string[];
  country: string[];
  currency: string[];
  industry: string[];
  mc: string[];
};

/**
 * Makes an API call. Resolves to the JSON response if the call is successful,
 * otherwise rejects with an error that has an {@link ErrorCode} as message.
 *
 * TODO: Merge with portfolio request
 *
 * @param token - Authentication token
 * @param method - Request method (GET, POST, etc.)
 * @param url - An URL relative to {@link baseURL}
 * @param body - The request body
 * @param additionalHeaders - Additional request headers
 *
 * @return Parsed JSON response if the API call succeeds
 */
async function request(
  token: string,
  method: string,
  url: string,
  body?: string,
  additionalHeaders?: HeadersInit
): Promise<unknown> {
  // TODO: authentication
  const response = await fetch(`${baseURL}/${url}`, {
    method,
    headers: { ...headers, ...additionalHeaders },
    body,
  }).catch(() => Promise.reject(new AppError('UNKNOWN'))); // network error etc.
  if (response.ok) {
    return Promise.resolve(response.json()); // valid response
  }
  const json = await response
    .json()
    .catch(() => Promise.reject(new AppError('UNKNOWN'))); // server error without JSON response
  return Promise.reject(new AppError(json.error)); // JSON error
}

/**
 * Gets an overview over all stocks with an authenticated user.
 *
 * @param token - Authentication token
 * @param filters - Object including all filters
 *
 */
export async function listStocks(
  token: string,
  filters: Filters
): Promise<Stock[]> {
  const base = 'list';
  let params = '';
  Object.keys(filters).forEach((key) => {
    if (filters[key].length > 0) {
      if (params.length === 0) {
        // TODO can be probably done nicer
        params += `?${key}=${filters[key].toString().replace(' ', '%20')}`;
      } else {
        params += `&${key}=${filters[key].toString().replace(' ', '%20')}`;
      }
    }
  });
  const response = (await request(token, 'GET', base + params)) as StockList;
  return response.stocks;
}

/**
 * Gets an overview over a single stock with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
export async function stockOverview(
  token: string,
  symbol: string
): Promise<Stock> {
  const response = (await request(
    token,
    'GET',
    `overview?id=${symbol}`
  )) as StockList;
  return response.stocks[0] as Stock;
}

/**
 * Gets a details over a single stock with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
export async function stockDetails(
  token: string,
  symbol: string
): Promise<StockDetails> {
  const response = (await request(
    token,
    'GET',
    `details?id=${symbol}`
  )) as StockDetails;
  return response;
}

// TODO Backend not working yet
/**
 * Gets a details over a single stock with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 * @param historic - if true all data will be returned, else only 5 years
 */
export async function stockCharts(
  token: string,
  symbol: string,
  historic: boolean
): Promise<StockDetails> {
  const response = (await request(
    token,
    'GET',
    `charts/historic?id=${symbol}&max=${historic.toString()}`
  )) as StockDetails;
  return response;
}
