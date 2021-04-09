import { AppError } from '../Errors';

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
  dividendPayoutRatio: number;
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

export type PositionQty = {
  isin: string;
  qty: number;
};

export type Backtesting = {
  MDDMaxToMin: number;
  MDDInitialToMin: number;
  dateMax: Date;
  dateMin: Date;
  maxValue: number;
  minValue: number;
  initialValue: number;
  bestYear: {
    changeBest: number;
    yearBest: string;
    growthRateBest: number;
  };
  worstYear: {
    changeWorst: number;
    yearWorst: string;
    growthRateWorst: number;
  };
  finalPortfolioBalance: number;
  CAGR: number;
  standardDeviation: number;
  sharpeRatio: number;
};

// Types describing the JSON response of API calls.
// The correctness of these types is assumed, no checks are performed.

export type BacktestingResponse = {
  error: string;
  success:
    | {
        MDDMaxToMin: number;
        MDDInitialToMin: number;
        dateMax: string;
        dateMin: string;
        maxValue: number;
        minValue: number;
        initialValue: number;
        bestYear: {
          changeBest: number;
          yearBest: string;
          growthRateBest: number;
        };
        worstYear: {
          changeWorst: number;
          yearWorst: string;
          growthRateWorst: number;
        };
        finalPortfolioBalance: number;
        CAGR: number;
        standardDeviation: number;
        sharpeRatio: number;
      }
    | Record<string, never>;
};

type NonEmptyBacktestingResponse = {
  error: string;
  success: {
    MDDMaxToMin: number;
    MDDInitialToMin: number;
    dateMax: string;
    dateMin: string;
    maxValue: number;
    minValue: number;
    initialValue: number;
    bestYear: {
      changeBest: number;
      yearBest: string;
      growthRateBest: number;
    };
    worstYear: {
      changeWorst: number;
      yearWorst: string;
      growthRateWorst: number;
    };
    finalPortfolioBalance: number;
    CAGR: number;
    standardDeviation: number;
    sharpeRatio: number;
  };
};

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

// mock portfolio while the api is not finished yet (copied from APIMocks.ts).
// TODO: remove this

const mockPortfolio: NonEmptyPortfolioDetails = {
  overview: {
    id: 'MOCK',
    name: 'mock portfolio',
    virtual: true,
    positionCount: 4,
    value: 174.98,
    score: 0.6,
    perf7d: 0,
    perf1y: -1,
    modified: new Date(1616086585),
  },
  positions: [
    {
      stock: {
        isin: 'MOCK0',
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
        isin: 'MOCK1',
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
        isin: 'MOCK2',
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
        isin: 'MOCK3',
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
  ],
  risk: {
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
  },
  keyFigures: [
    {
      year: 2016,
      pte: 30,
      ptb: 50,
      ptg: 30,
      eps: 10,
      div: 30,
      dividendPayoutRatio: 25,
    },
    {
      year: 2017,
      pte: 40,
      ptb: 25,
      ptg: 50,
      eps: 20,
      div: 40,
      dividendPayoutRatio: 25,
    },
    {
      year: 2018,
      pte: 45,
      ptb: 35,
      ptg: 15,
      eps: 25,
      div: 45,
      dividendPayoutRatio: 25,
    },
    {
      year: 2019,
      pte: 50,
      ptb: 80,
      ptg: 40,
      eps: 10,
      div: 50,
      dividendPayoutRatio: 25,
    },
    {
      year: 2020,
      pte: 50,
      ptb: 20,
      ptg: 10,
      eps: 90,
      div: 50,
      dividendPayoutRatio: 25,
    },
  ],
  nextDividend: new Date(),
  dividendPayoutRatio: 25,
  totalReturn: 75.43,
  totalReturnPercent: 12.34,
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
 * Converts a {@link BacktestingResponse} object as received from the API
 * to a {@link Backtesting} object for use by the application.
 */
function convertBacktesting(
  response: NonEmptyBacktestingResponse
): Backtesting {
  const { success } = response;
  return {
    ...success,
    dateMin: new Date(success.dateMin),
    dateMax: new Date(success.dateMax),
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
 * Gets an overview over all portfolios of the authenticated user.
 *
 * @param token - Authentication token
 */
export async function list(token: string): Promise<PortfolioOverview[]> {
  const response = (await request(token, 'GET', 'list')) as ListResponse;
  // TODO: remove mock when api is implemented
  return [
    ...response.portfolios.map(convertPortfolioOverview),
    mockPortfolio.overview,
  ];
}

/**
 * Gets the data needed for the Back-Testing section of the portfolio details page.
 *
 * @param token - Authentication token
 * @param id - Id of the portfolio for which the Back-Testing information is needed
 * @param from - UNIX timestamp for the date FROM which the user wants to backtest
 * @param to - UNIX timestamp for the date UNTIL WHICH the user wants to backtest
 */
export async function backtesting(
  token: string,
  id: string,
  from: Date,
  to: Date
): Promise<Backtesting> {
  const response = (await request(
    token,
    'GET',
    `/analytics/backtest/${id}?${from.toISOString().split('T')[0]}&${
      to.toISOString().split('T')[0]
    }`
  )) as BacktestingResponse;
  if (
    response.error.length > 0 ||
    Object.entries(response.success).length === 0
  )
    throw new Error(response.error);
  return convertBacktesting(response as NonEmptyBacktestingResponse);
}

export async function details(
  token: string,
  id: string
): Promise<PortfolioDetails> {
  // TODO: remove mock when api is implemented
  if (id === 'MOCK') {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockPortfolio), 1000)
    );
  }
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

export async function modify(
  token: string,
  id: string,
  modifications: PositionQty[]
): Promise<void> {
  await request(
    token,
    'PUT',
    `modify/${id}`,
    JSON.stringify({ modifications })
  );
}
