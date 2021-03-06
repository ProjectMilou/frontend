// Initially based on Portfolio API Client

import { AppError } from '../Errors';
import { BaseService, MethodType } from '../services/BaseService';

const endpoint = 'stocks';

// Filter object
export type Filters = {
  [key: string]: string[];
  country: string[];
  currency: string[];
  industry: string[];
  mc: string[];
};

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
  mcSize: string;
};

// List of stocks
type StockList = {
  stocks: Stock[];
};

// Stock details
// all strings since there are problems in backend
export type StockDetails = {
  symbol: string;
  analystTargetPrice: string;
  country: string;
  currency: string;
  date: string;
  industry: string;
  marketCapitalization: string;
  name: string;
  valuation: string;
  per1d: string;
  per30d: string;
  per7d: string;
  per365d: string;
  address: string;
  assembly: string;
  div: string;
  employees: string;
  founded: string;
  growth: string;
  isin: string;
  intro: string;
  picture: string;
  website: string;
  wkn: string;
  assetType: string;
  beta: number;
  bookValue: string;
  cik: string;
  dilutedEPSTTM: string;
  dividendDate: string;
  dividendPerShare: string;
  ebitda: number;
  eps: string;
  evToEbitda: string;
  evToRevenue: string;
  exDividendDate: string;
  exchange: string;
  fiscalYearEnd: string;
  forwardAnnualDividendRate: string;
  forwardAnnualDividendYield: string;
  forwardPE: string;
  grossProfitTTM: string;
  lastSplitDate: string;
  lastSplitFactor: string;
  latestQuarter: string;
  operatingMarginTTMprofitMargin: string;
  payoutRatio: string;
  peRatio: string;
  pegRatio: string;
  per200DayMovingAverage: string;
  per50DayMovingAverage: string;
  per52WeekHigh: string;
  per52WeekLow: string;
  percentInsiders: string;
  percentInstitutions: string;
  priceToBookRatio: string;
  priceToSalesRatioTTM: string;
  profitMargin: string;
  quarterlyEarningsGrowthYOY: string;
  quarterlyRevenueGrowthYOY: string;
  returnOnAssetsTTM: string;
  returnOnEquityTTM: string;
  revenuePerShareTTM: string;
  revenueTTM: string;
  sharesFloat: string;
  sharesOutstanding: string;
  sharesShort: string;
  sharesShortPriorMonth: string;
  shortPercentFloat: string;
  shortPercentOutstanding: string;
  shortRatio: string;
  trailingPE: string;
  price: string;
  mcSize: string;
};

type StockDetailsAnswer = {
  stocks: StockDetails[];
};

// historic performance data
export type StockHistoricPerformanceList = {
  dataPoints: StockHistoricPerformance[];
};

export type StockHistoricPerformance = {
  _id: string;
  date: string;
  close: string;
};

// dividend performance data
export type StockHistoricDividendList = {
  dataPoints: StockHistoricDividend[];
  date: string;
  quota: string;
};

export type StockHistoricDividend = {
  _id: string;
  date: string;
  div: number;
};

export type CompanyReports = {
  symbol: string;
  annualReports: CompanyReport[];
};

export type CompanyReport = {
  _id: string;
  fiscalDateEnding: Date;
  reportedCurrency: string;
  totalAssets: number;
  totalCurrentAssets: number;
  cashAndCashEquivalentsAtCarryingValue: number;
  cashAndShortTermInvestments: number;
  inventory: number;
  currentNetReceivables: number;
  totalNonCurrentAssets: number;
  propertyPlantEquipment: number;
  accumulatedDepreciationAmortizationPPE: number;
  intangibleAssets: number;
  intangibleAssetsExcludingGoodwill: number;
  goodwill: number;
  investments: number;
  longTermInvestments: number;
  shortTermInvestments: number;
  otherCurrentAssets: number;
  otherNonCurrentAssets: number;
  totalLiabilities: number;
  totalCurrentLiabilities: number;
  currentAccountsPayable: number;
  deferredRevenue: number;
  currentDebt: number;
  shortTermDebt: number;
  totalNonCurrentLiabilities: number;
  capitalLeaseObligations: number;
  longTermDebt: number;
  currentLongTermDebt: number;
  longTermDebtNoncurrent: number;
  shortLongTermDebtTotal: number;
  otherCurrentLiabilities: number;
  otherNonCurrentLiabilities: number;
  totalShareholderEquity: number;
  treasuryStock: number;
  retainedEarnings: number;
  commonStock: number;
  commonStockSharesOutstanding: number;
};

export type CashFlowList = {
  symbol: string;
  annualReports: CashFlow[];
};

export type CashFlow = {
  _id: string;
  fiscalDateEnding: string;
  reportedCurrency: number;
  operatingCashflow: number;
  paymentsForOperatingActivities: number;
  proceedsFromOperatingActivities: number;
  changeInOperatingLiabilities: number;
  changeInOperatingAssets: number;
  depreciationDepletionAndAmortization: number;
  capitalExpenditures: number;
  changeInReceivables: number;
  changeInInventory: number;
  profitLoss: number;
  cashflowFromInvestment: number;
  cashflowFromFinancing: number;
  proceedsFromRepaymentsOfShortTermDebt: number;
  paymentsForRepurchaseOfCommonStock: number;
  paymentsForRepurchaseOfEquity: number;
  paymentsForRepurchaseOfPreferredStock: number;
  dividendPayout: number;
  dividendPayoutCommonStock: number;
  dividendPayoutPreferredStock: number;
  proceedsFromIssuanceOfCommonStock: number;
  proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: number;
  proceedsFromIssuanceOfPreferredStock: number;
  proceedsFromRepurchaseOfEquity: number;
  proceedsFromSaleOfTreasuryStock: number;
  changeInCashAndCashEquivalents: number;
  changeInExchangeRate: number;
  netIncome: number;
};

export type News = {
  headline: string;
  summary: string;
  url: string; // TODO change to URL in backend
  publishedAt: string; // TODO change to URL in backend
};

export type NewsList = {
  news: News[];
};

export type AnalystsRecommendation = {
  symbol: string;
  buy: number;
  hold: number;
  sell: number;
  strategy: string;
  date: Date;
  source: URL;
};

export type KeyFigure = {
  date: string;
  PERatio: number;
  EPS: string;
  PEGrowthRatio: number;
  PBRatio: number;
};

export type KeyFigures = {
  error: string;
  success: KeyFigure[];
};

export type InterestCoverageList = {
  error: string;
  success: InterestCoverage[];
};

export type InterestCoverage = {
  date: Date;
  interestCoverage: number;
};

export type RiskList = {
  error: string;
  success: Risk;
};

export type Risk = {
  volatility: number;
  averageMarketVolatility: number;
};

/**
 * this method is used to convert string to number format in the {@link stockOverview}.
 * Has to be used since backend is not providing any numbers yet, everything is a string
 */
const convertStockOverview = (apiStock: Stock): Stock =>
  ({
    ...apiStock,
    ...(apiStock.price && { price: parseFloat(apiStock.price.toString()) }),
    ...(apiStock.per1d && { per1d: parseFloat(apiStock.per1d.toString()) }),
    ...(apiStock.per7d && { per7d: parseFloat(apiStock.per7d.toString()) }),
    ...(apiStock.per30d && { per30d: parseFloat(apiStock.per30d.toString()) }),
    ...(apiStock.per365d && {
      per365d: parseFloat(apiStock.per365d.toString()),
    }),
    ...(apiStock.marketCapitalization && {
      marketCapitalization: parseInt(
        apiStock.marketCapitalization.toString(),
        10
      ),
    }),
    ...(apiStock.analystTargetPrice && {
      analystTargetPrice: parseFloat(apiStock.analystTargetPrice.toString()),
    }),
    ...(apiStock.valuation && {
      valuation: parseInt(apiStock.valuation.toString(), 10),
    }),
    ...(apiStock.growth && { growth: parseFloat(apiStock.growth.toString()) }),
    ...(apiStock.div && {
      div:
        apiStock.div.toString() === 'None' || apiStock.div.toString() === 'NaN'
          ? 0.0
          : parseFloat(apiStock.div.toString()),
    }),
  } as Stock);

/**
 * Makes an API call. Resolves to the JSON response if the call is successful,
 * otherwise rejects with an error that has an {@link ErrorCode} as message.
 *
 * This method is a copy of portfolio teams request function.
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
  // can be used for debugging
  // console.log(`${customEndpoint || endpoint}/${url}`)
  const response = await BaseService.request(
    method,
    `${customEndpoint || endpoint}/${url}`,
    headers,
    body
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
 * Gets an overview over all stocks with an authenticated user.
 *
 * @param filters - Object including all filters
 *
 */
export async function listStocks(filters: Filters): Promise<Stock[]> {
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
  const response = (await request('GET', base + params)) as StockList;
  return response.stocks.map((s) => convertStockOverview(s));
}

/**
 * Gets an overview over a single stock with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function stockOverview(symbol: string): Promise<Stock> {
  const response = (await request('GET', `overview?id=${symbol}`)) as StockList;

  // TODO fix in backend, this is total BS
  const apiStock = response.stocks[0];
  return convertStockOverview(apiStock);
}

/**
 * Gets a details over a single stock with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function stockDetails(symbol: string): Promise<StockDetails> {
  const response = (await request(
    'GET',
    `details?id=${symbol}`
  )) as StockDetailsAnswer;
  return response.stocks[0] as StockDetails;
}

/**
 * Gets stock performance with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 * @param historic - if true all data will be returned, else only 5 years
 */
export async function stockPerformance(
  symbol: string,
  historic: boolean
): Promise<StockHistoricPerformanceList> {
  const response = (await request(
    'GET',
    `charts/historic?id=${symbol}&max=${historic.toString()}`
  )) as StockHistoricPerformanceList;
  return response;
}

/**
 * Gets stock performance with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 * @param dividend - if true all data will be returned, else only 5 years
 */
export async function stockDividend(
  symbol: string,
  dividend: boolean
): Promise<StockHistoricDividendList> {
  const response = (await request(
    'GET',
    `charts/dividend?id=${symbol}&max=${dividend.toString()}`
  )) as StockHistoricDividendList;
  return response;
}

/**
 * Gets company reports with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function companyReports(symbol: string): Promise<CompanyReports> {
  const response = (await request(
    'GET',
    `balanceSheet?id=${symbol}`
  )) as CompanyReports;
  return response;
}

/**
 * Gets analysts recommendations with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function analystsRecommendations(
  symbol: string
): Promise<AnalystsRecommendation[]> {
  const response = (await request(
    'GET',
    `charts/analysts?id=${symbol}`
  )) as AnalystsRecommendation[];
  return response;
}

/**
 * Gets cash newsData with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function newsList(symbol: string): Promise<NewsList> {
  const response = (await request('GET', `news?id=${symbol}`)) as NewsList;
  return response;
}

/**
 * Gets cash flow  Data with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function cashFlowList(symbol: string): Promise<CashFlowList> {
  const response = (await request(
    'GET',
    `cashFlow?id=${symbol}`
  )) as CashFlowList;
  return response;
}

/**
 * Gets interest coverages with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function interestCoverages(
  symbol: string
): Promise<InterestCoverageList> {
  const response = (await request(
    'GET',
    `interestCoverage/${symbol}`,
    undefined,
    undefined,
    'analytics'
  )) as InterestCoverageList;
  return response;
}

/**
 * Gets risk values with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 */
export async function risks(symbol: string): Promise<RiskList> {
  const response = (await request(
    'GET',
    `risk/${symbol}`,
    undefined,
    undefined,
    'analytics'
  )) as RiskList;
  return response;
}

/**
 * Gets EPS Data with an authenticated user.
 *
 * @param symbol - Stock Symbol to search for
 * @param historic - if true all data will be returned, else only 5 years
 */
export async function keyFigures(symbol: string): Promise<KeyFigures> {
  const response = (await request(
    'GET',
    `keyfigures/${symbol}`,
    undefined,
    undefined,
    'analytics'
  )) as KeyFigures;
  return response;
}
