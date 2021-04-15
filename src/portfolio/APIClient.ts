import { AppError } from '../Errors';
import { BaseService, MethodType } from '../services/BaseService';

// TODO: Create a PortfolioService that extends BaseService

const endpoint = 'portfolio';
const jsonContentTypeHeader = { 'Content-Type': 'application/json' };

// Types used by the frontend

// TODO: Use a dictionary object instead of an array to make searching by id easier
export type EmptyPortfolioOverview = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  perf7d: number;
  perf7dPercent: number;
  perf1y: number;
  perf1yPercent: number;
  modified: Date;
};

export type NonEmptyPortfolioOverview = EmptyPortfolioOverview & {
  score: number;
};

export type PortfolioOverview =
  | EmptyPortfolioOverview
  | NonEmptyPortfolioOverview;

export type Stock = {
  symbol: string;
  name: string;
  price: number;
  perf7d: number;
  perf7dPercent: number;
  perf1y: number;
  perf1yPercent: number;
  volatility: number;
  debtEquity: number;
  score: number;
};

export type Position = {
  stock: Stock;
  qty: number;
  totalReturn: number;
  totalReturnPercent: number;
};

export type Diversification = {
  [key: string]: number;
};

export type RiskAnalysis = {
  countries: Diversification;
  segments: Diversification;
  currency: Diversification;
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

export type Correlations = {
  [key: string]: number;
};

export type Analytics = {
  volatility: number;
  standardDeviation: number;
  sharpeRatio: number;
  treynorRatio: number;
  debtEquity: number;
  correlations: Correlations;
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
  totalReturn: number;
  totalReturnPercent: number;
  analytics: Analytics;
};

export type PortfolioDetails = EmptyPortfolioDetails | NonEmptyPortfolioDetails;

export type PositionQty = {
  symbol: string;
  qty: number;
};

export type PortfolioQty = {
  id: string;
  qty: number;
};

export type PortfolioStock = {
  id: string;
  name: string;
  virtual: boolean;
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
  perf7d: number;
  perf7dPercent: number;
  perf1y: number;
  perf1yPercent: number;
  /** UNIX timestamp */
  modified: number;
};

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
  totalReturn: number;
  totalReturnPercent: number;
  analytics: Analytics;
};

type DetailsResponse = EmptyDetailsResponse | NonEmptyDetailsResponse;

type DuplicateResponse = {
  id: string;
};

type CreateResponse = {
  id: string;
};

type PortfolioStockResponse = { portfolios: PortfolioStock[] };

// mock portfolio while the api is not finished yet (copied from APIMocks.ts).
// TODO: remove this
const MockCorrelations: Correlations = {
  'BMW;Apple': 0.33,
  'Apple;TUM': 0.56,
  'Apple;Faber': 0.55,
  'TUM;BMW': -0.3,
  'BMW;Faber': -0.8,
  'Faber;TUM': 0.1,
};

const MockAnalytics: Analytics = {
  volatility: 1.45,
  standardDeviation: 0.12,
  sharpeRatio: 0.45,
  treynorRatio: 1.2,
  debtEquity: 0.55,
  correlations: MockCorrelations,
};

const mockPortfolio: NonEmptyPortfolioDetails = {
  overview: {
    id: 'MOCK',
    name: 'mock portfolio',
    virtual: true,
    positionCount: 4,
    value: 174.98,
    score: 0.6,
    perf7d: 0,
    perf7dPercent: 0,
    perf1y: -1,
    perf1yPercent: -0.5,
    modified: new Date(1616086585),
  },
  positions: [
    {
      stock: {
        symbol: 'BMW',
        name: 'BMW',
        price: 23.25,
        perf7d: -1,
        perf7dPercent: -0.3,
        perf1y: 5,
        perf1yPercent: 2,
        volatility: 0.3,
        debtEquity: 0.8,
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
        perf7dPercent: 2.4,
        perf1y: -15,
        perf1yPercent: 10.5,
        volatility: 1.3,
        debtEquity: 1.5,
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
        perf7dPercent: 12,
        perf1y: 10,
        perf1yPercent: 8.5,
        volatility: 0.8,
        debtEquity: 0.5,
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
        perf7dPercent: 1,
        perf1y: 2,
        perf1yPercent: 0.4,
        score: 0.9,
        volatility: 1.33,
        debtEquity: 1.45,
      },
      qty: 4,
      totalReturn: -1.23,
      totalReturnPercent: -0.97,
    },
  ],
  risk: {
    countries: {
      USA: 2,
      GER: 3,
    },
    segments: {
      'Financial Service': 2,
      HealthCare: 5,
    },
    currency: {
      Dollar: 2,
      Euro: 3,
    },
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
  totalReturn: 75.43,
  totalReturnPercent: 12.34,
  analytics: MockAnalytics,
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
 * @param method - Request method (GET, POST, etc.)
 * @param url - An URL relative to {@link baseURL}
 * @param body - The request body
 * @param headers - Additional request headers
 *
 * @return Parsed JSON response if the API call succeeds
 */
async function request(
  method: MethodType,
  url: string,
  body?: Record<string, unknown>,
  headers?: HeadersInit
): Promise<unknown> {
  const response = await BaseService.authenticatedRequest(
    method,
    `${endpoint}/${url}`,
    body,
    headers
  );
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
 */
export async function list(): Promise<PortfolioOverview[]> {
  const response = (await request('GET', 'list')) as ListResponse;
  // TODO: remove mock when api is implemented
  return [
    ...response.portfolios.map(convertPortfolioOverview),
    mockPortfolio.overview,
  ];
}

/**
 * Gets the data needed for the Back-Testing section of the portfolio details page.
 *
 * @param id - Id of the portfolio for which the Back-Testing information is needed
 * @param from - UNIX timestamp for the date FROM which the user wants to backtest
 * @param to - UNIX timestamp for the date UNTIL WHICH the user wants to backtest
 */
export async function backtesting(
  id: string,
  from: Date,
  to: Date
): Promise<Backtesting> {
  const response = (await request(
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

export async function details(id: string): Promise<PortfolioDetails> {
  // TODO: remove mock when api is implemented
  if (id === 'MOCK') {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockPortfolio), 1000)
    );
  }
  const response = (await request('GET', `details/${id}`)) as DetailsResponse;
  return convertPortfolioDetails(response);
}

/**
 * Renames a portfolio.

 * @param id - ID of the portfolio to be renamed
 * @param name - New name of the portfolio
 */
export async function rename(id: string, name: string): Promise<void> {
  await request('PUT', `rename/${id}`, { name }, jsonContentTypeHeader);
}

/**
 * Duplicates a portfolio.
 *
 * @param id - ID of the portfolio to be duplicated
 * @param name - Name of the duplicate
 * @return ID of the duplicate
 */
export async function duplicate(id: string, name: string): Promise<string> {
  const response = (await request(
    'POST',
    `duplicate/${id}`,
    { name },
    jsonContentTypeHeader
  )) as DuplicateResponse;
  return response.id;
}

/**
 * Deletes a portfolio.
 *
 * @param id - ID of the portfolio to be deleted
 */
export async function deletePortfolio(id: string): Promise<void> {
  await request('DELETE', id);
}

/**
 * Creates a new portfolio.
 *
 * @param name - Name of the new portfolio
 * @return ID of the new portfolio
 */
export async function create(name: string): Promise<string> {
  const response = (await request(
    'POST',
    'create',
    { name },
    jsonContentTypeHeader
  )) as CreateResponse;
  return response.id;
}

export async function modify(
  id: string,
  modifications: PositionQty[]
): Promise<void> {
  await request(
    'PUT',
    `modify/${id}`,
    { modifications },
    jsonContentTypeHeader
  );
}

/**
 * Gets the portfolio name and quantity of a specified stock for all portfolios of the current user.
 * This information is displayed to the user when adding a stock to his portfolios.
 *
 * @param symbol - Symbol of the current stock
 */
export async function stock(symbol: string): Promise<PortfolioStock[]> {
  const response = (await request(
    'GET',
    `stock/${symbol}`
  )) as PortfolioStockResponse;
  return response.portfolios;
}

/**
 * Modifies a stock's quantity within multiple portfolios simultaneously.
 *
 * @param symbol - Symbol of the current stock
 * @param modifications - modifications made to the portfolios
 */
export async function saveStockToPortfolios(
  symbol: string,
  modifications: PortfolioQty[]
): Promise<void> {
  await request(
    'PUT',
    `stock/${symbol}`,
    { modifications },
    jsonContentTypeHeader
  );
}
