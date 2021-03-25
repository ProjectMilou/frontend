// TODO: Change to production URL when available
// TODO: Use a common base URL for shell, analyser and portfolio instead of 3 URLs
export const baseURL =
  'https://api.milou.io/stocks';

const headers = { 'Content-Type': 'application/json' };

// Types describing the JSON response of API calls.
// The correctness of these types is assumed, no checks are performed.

// Stock type
export type Stock = {
  symbol: string;
  ISIN: string;
  WKN: string;
  name: string;
  price: number;
  "1d": number;
  "7d": number;
  "30d": number;
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


// Stock details
type StockDetails = {
  symbol: string;
  intro: string;
  founded: number;
  positionCount: number;
  website: URL;
  fullTimeEmplyees: number;
  adress: string;
  assenmbly: Date;
};

// List of stocks
type StockList = {
  stocks: {
    symbol: string;
    ISIN: string;
    WKN: string;
    name: string;
    price: number;
    "1d": number;
    "7d": number;
    "30d": number;
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
  }[];
};

/**
 * Makes an API call. Resolves to the JSON response if the call is successful,
 * otherwise rejects with an error that has an {@link ErrorCode} as message.
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
  }).catch(() => Promise.reject(new Error('UNKNOWN'))); // network error etc.
  if (response.ok) {
    return Promise.resolve(response.json()); // valid response
  }
  const json = await response
    .json()
    .catch(() => Promise.reject(new Error('UNKNOWN'))); // server error without JSON response
  return Promise.reject(new Error(json.error)); // JSON error
}

/**
 * Gets an overview over all stocks with an authenticated user.
 *
 * @param token - Authentication token
 */
export async function listStocks(token: string): Promise<Stock[]> {
  const response = (await request(token, 'GET', '')) as StockList;
  return response.stocks
}

/**
 * Gets an overview over a single stock with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
 export async function stockOverview(token: string, symbol: string): Promise<Stock> {
  const response = (await request(token, 'GET', `${symbol}/details`)) as Stock ;
  return response
}

/**
 * Gets a details over a single stock with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
 export async function stockDetails(token: string, symbol: string): Promise<StockDetails> {
  const response = (await request(token, 'GET', symbol)) as StockDetails ;
  return response
}
