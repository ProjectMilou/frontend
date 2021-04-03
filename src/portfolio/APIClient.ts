// TODO: Change to production URL when available
// TODO: Use a common base URL for shell, analyser and portfolio instead of 3 URLs
export const baseURL = 'https://api.milou.io/portfolio';

const headers = { 'Content-Type': 'application/json' };

// Types used by the frontend

type Performance = {
  perf7d: number;
  perf1y: number;
};

// TODO: Use a dictionary object instead of an array to make searching by id easier
export type EmptyPortfolioOverview = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  modified: Date;
} & Performance;

export type NonEmptyPortfolioOverview = EmptyPortfolioOverview & {
  score: number;
};

export type PortfolioOverview =
  | EmptyPortfolioOverview
  | NonEmptyPortfolioOverview;

export type Stock = {
  isin: string;
  symbol: string;
  name: string;
  price: number;
  perf7d: number;
  perf1y: number;
  country: string;
  industry: string;
  currency: string;
  score: number;
} & Performance;

export type Position = {
  stock: Stock;
  qty: number;
  totalReturn: number;
  totalReturnPercent: number;
};

export type Risk = {
  count: number;
  score: number;
  warnings: string[];
};

export type RiskAnalysis = {
  countries: Risk;
  segments: Risk;
  currency: Risk;
};

export type KeyFigures = {
  year: number;
  pte: number;
  ptb: number;
  ptg: number;
  eps: number;
  div: number;
};

export type EmptyPortfolioDetails = {
  overview: EmptyPortfolioOverview;
  positions: [];
};

export type NonEmptyPortfolioDetails = {
  overview: NonEmptyPortfolioOverview;
  positions: Position[];
  risk: RiskAnalysis;
  keyFigures: KeyFigures[];
  nextDividend: Date;
  dividendPayoutRatio: number;
  totalReturn: number;
  totalReturnPercent: number;
};

export type PortfolioDetails = EmptyPortfolioDetails | NonEmptyPortfolioDetails;

// Types describing the JSON response of API calls.
// The correctness of these types is assumed, no checks are performed.

type PortfolioOverviewResponse = {
  id: number;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score?: number;
  /** UNIX timestamp */
  modified: number;
} & Performance;

type ListResponse = {
  portfolios: PortfolioOverviewResponse[];
};

type EmptyDetailsResponse = {
  overview: PortfolioOverviewResponse;
  positions: [];
};

type NonEmptyDetailsResponse = {
  overview: PortfolioOverviewResponse;
  positions: Position[];
  risk: RiskAnalysis;
  keyFigures: KeyFigures[];
  /** UNIX timestamp */
  nextDividend: number;
  dividendPayoutRatio: number;
  totalReturn: number;
  totalReturnPercent: number;
};

type DetailsResponse = EmptyDetailsResponse | NonEmptyDetailsResponse;

type DuplicateResponse = {
  id: string;
};

type CreateResponse = {
  id: string;
};

/**
 * Converts a {@link PortfolioOverviewResponse} object as received from the API
 * to a {@link PortfolioOverview} object for use by the application.
 */
function convertPortfolioOverview(
  response: PortfolioOverviewResponse
): PortfolioOverview {
  return {
    ...response,
    id: response.id.toString(),
    modified: new Date(response.modified),
  };
}

/**
 * Converts a {@link DetailsResponse} object as received from the API to a
 * {@link PortfolioDetails} object for use by the application. If the portfolio
 * is empty, the returned object is of type {@link EmptyPortfolioDetails},
 * otherwise {@link NonEmptyPortfolioDetails}.
 */
function convertPortfolioDetails(response: DetailsResponse): PortfolioDetails {
  if (response.overview.positionCount) {
    // portfolio is not empty
    const r = response as NonEmptyDetailsResponse;
    return {
      ...r,
      overview: convertPortfolioOverview(
        r.overview
      ) as NonEmptyPortfolioOverview,
      nextDividend: new Date(r.nextDividend),
      // TODO: remove once API response includes currency
      positions: r.positions.map((p) => ({
        ...p,
        stock: { ...p.stock, currency: p.stock.currency || '???' },
        totalReturn: p.totalReturn || 0,
        totalReturnPercent: p.totalReturnPercent || 0,
      })),
    };
  }
  // portfolio is empty
  const r = response as EmptyDetailsResponse;
  return {
    ...r,
    overview: convertPortfolioOverview(r.overview),
  };
}

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
 * Gets an overview over all portfolios of the authenticated user.
 *
 * @param token - Authentication token
 */
export async function list(token: string): Promise<PortfolioOverview[]> {
  const response = (await request(token, 'GET', 'list')) as ListResponse;
  return response.portfolios.map(convertPortfolioOverview);
}

export async function details(
  token: string,
  id: string
): Promise<PortfolioDetails> {
  const response = (await request(
    token,
    'GET',
    `details/${id}`
  )) as DetailsResponse;
  return convertPortfolioDetails(response);
}

/**
 * Renames a portfolio.
 *
 * @param token - Authentication token
 * @param id - ID of the portfolio to be renamed
 * @param name - New name of the portfolio
 */
export async function rename(
  token: string,
  id: string,
  name: string
): Promise<void> {
  await request(token, 'PUT', `rename/${id}`, JSON.stringify({ name }));
}

/**
 * Duplicates a portfolio.
 *
 * @param token - Authentication token
 * @param id - ID of the portfolio to be duplicated
 * @param name - Name of the duplicate
 * @return ID of the duplicate
 */
export async function duplicate(
  token: string,
  id: string,
  name: string
): Promise<string> {
  const response = (await request(
    token,
    'POST',
    `duplicate/${id}`,
    JSON.stringify({ name })
  )) as DuplicateResponse;
  return response.id;
}

/**
 * Deletes a portfolio.
 *
 * @param token - Authentication token
 * @param id - ID of the portfolio to be deleted
 */
export async function deletePortfolio(
  token: string,
  id: string
): Promise<void> {
  await request(token, 'DELETE', id);
}

/**
 * Creates a new portfolio.
 *
 * @param token - Authentication token
 * @param name - Name of the new portfolio
 * @return ID of the new portfolio
 */
export async function create(token: string, name: string): Promise<string> {
  const response = (await request(
    token,
    'POST',
    'create',
    JSON.stringify({ name })
  )) as CreateResponse;
  return response.id;
}
