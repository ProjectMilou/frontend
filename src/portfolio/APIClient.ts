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
  missingData: boolean;
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
  div?: number;
  dividendPayoutRatio?: number;
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
  nextDividend?: Date;
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
  MDDMaxToMin: number;
  MDDInitialToMin: number;
  dateMax: Date;
  dateMin: Date;
  maxValue: number;
  minValue: number;
  initialValue: number;
};

// The first number is a timestamp, the second number is the portfolio value at that time.
export type Performance = [number, number][];

// The search result includes more data. This type includes only the data used by us.
export type StockSearchResult = {
  symbol: string;
  name?: string;
  price?: number;
};

// Types describing the JSON response of API calls.
// The correctness of these types is assumed, no checks are performed.

export type BacktestingResponse = {
  error: string;
  success:
    | {
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
        MDDMaxToMin: number;
        MDDInitialToMin: number;
        dateMax: string;
        dateMin: string;
        maxValue: number;
        minValue: number;
        initialValue: number;
      }
    | Record<string, never>;
};

type NonEmptyBacktestingResponse = {
  error: string;
  success: {
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
    MDDMaxToMin: number;
    MDDInitialToMin: number;
    dateMax: string;
    dateMin: string;
    maxValue: number;
    minValue: number;
    initialValue: number;
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
  keyFigures: KeyFiguresResponse[];
  /** UNIX timestamp */
  nextDividend?: number | null;
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

type PerformanceResponse = { chart: Performance };

type KeyFiguresResponse = {
  year: number;
  pte: number;
  ptb: number;
  ptg: number;
  eps: number;
  div?: number | null;
  dividendPayoutRatio?: number | null;
};

type StockSearchResponse = { stocks: StockSearchResult[] };

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
      nextDividend: r.nextDividend ? new Date(r.nextDividend) : undefined,
      // div and dividendPayoutRatio can be null
      keyFigures: r.keyFigures.map<KeyFigures>((k) => ({
        ...k,
        div: k.div === null ? undefined : k.div,
        dividendPayoutRatio:
          k.dividendPayoutRatio === null ? undefined : k.dividendPayoutRatio,
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
 * @param method - Request method (GET, POST, etc.)
 * @param url - An URL relative to {@link baseURL}
 * @param body - The request body
 * @param headers - Additional request headers
 * @param customEndpoint - choose a custom waypoint to make the request, default is /portfolio

 *
 * @return Parsed JSON response if the API call succeeds
 */
async function request(
  method: MethodType,
  url: string,
  body?: Record<string, unknown>,
  headers?: HeadersInit,
  customEndpoint?: string
): Promise<unknown> {
  const response = await BaseService.authenticatedRequest(
    method,
    `${customEndpoint || endpoint}/${url}`,
    body,
    headers
  );
  if (response.ok) {
    return Promise.resolve(response.json()); // valid response
  }
  if (response.status === 401) {
    return Promise.reject(new AppError('AUTH_TOKEN_INVALID')); // Unauthorized
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
  return response.portfolios.map(convertPortfolioOverview);
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
    `backtest/${id}?fromDate=${from.toISOString().split('T')[0]}&toDate=${
      to.toISOString().split('T')[0]
    }`,
    undefined,
    undefined,
    'analytics'
  )) as BacktestingResponse;
  if (
    response.error.length > 0 ||
    Object.entries(response.success).length === 0 ||
    Number.isNaN(new Date(response.success.dateMin).getTime()) ||
    Number.isNaN(new Date(response.success.dateMax).getTime())
  )
    return Promise.reject(new AppError('NO_BACKTESTING_DATA'));
  return convertBacktesting(response as NonEmptyBacktestingResponse);
}

export async function details(id: string): Promise<PortfolioDetails> {
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

/**
 * Gets the performance of a portfolio to display in a chart.
 *
 * @param id - Portfolio ID
 */
export async function performance(id: string): Promise<Performance> {
  const response = (await request(
    'GET',
    `performance/${id}`
  )) as PerformanceResponse;
  return response.chart;
}

/**
 * Searches for stocks. The search result count is limited to 10.
 *
 * @param searchTerm - A search term
 */
export async function stockSearch(
  searchTerm: string
): Promise<StockSearchResult[]> {
  const response = (await request(
    'GET',
    `search?id=${encodeURIComponent(searchTerm)}&limit=10&pageNumber=1`,
    undefined,
    undefined,
    'stocks'
  )) as StockSearchResponse;
  // The search result can include undefined/null values. Stocks are identified by the symbol. If it's missing, the result is ignored.
  return response.stocks.filter((s) => s.symbol);
}
