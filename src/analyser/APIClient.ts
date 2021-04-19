// Based on Portfolio API Client

import { AppError } from '../Errors';

export const baseURL = 'https://api.milou.io/stocks';
const headers = { 'Content-Type': 'application/json' };

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
  price: string;
  per1d: string;
  per7d: string;
  per30d: string;
  per365d: string;
  marketCapitalization: number;
  analystTargetPrice: number;
  valuation: number;
  growth: number;
  div: string;
  currency: string;
  country: string;
  industry: string;
  picture: URL;
  date: Date;
  dividendPerShare: number;
  revenuePerShareTTM: number;
};

// List of stocks
type StockList = {
  stocks: Stock[];
};

// Stock details
// all strings since there are probmens in backend
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
  beta: string;
  bookValue: string;
  cik: string;
  dilutedEPSTTM: string;
  dividendDate: string;
  dividendPerShare: string;
  ebitda: string;
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
export type StockHistricPerformanceList = {
  dataPoints: StockHistricPerformance[];
};

export type StockHistricPerformance = {
  _id: string;
  date: string;
  close: string;
};

// dividend performance data
export type StockHistricDividendList = {
  dataPoints: StockHistricDividend[];
  date: string;
  quota: string;
};

export type StockHistricDividend = {
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
  otherNonCurrrentAssets: number;
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
  // quarterlyReports: CashFlow[];
};

export type CashFlow = {
  _id: string;
  fiscalDateEnding: number;
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
  date: string; // TODO change to date
  url: string; // Todo change to URL
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

  // console.log(`${baseURL}/${url}`);
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
  )) as StockDetailsAnswer;
  return response.stocks[0] as StockDetails;
}

/**
 * Gets stock performance with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 * @param historic - if true all data will be returned, else only 5 years
 */
export async function stockPerformance(
  token: string,
  symbol: string,
  historic: boolean
): Promise<StockHistricPerformanceList> {
  const response = (await request(
    token,
    'GET',
    `charts/historic?id=${symbol}&max=${historic.toString()}`
  )) as StockHistricPerformanceList;
  return response;
}

/**
 * Gets stock performance with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 * @param dividend - if true all data will be returned, else only 5 years
 */
export async function stockDividend(
  token: string,
  symbol: string,
  dividend: boolean
): Promise<StockHistricDividendList> {
  const response = (await request(
    token,
    'GET',
    `charts/dividend?id=${symbol}&max=${dividend.toString()}`
  )) as StockHistricDividendList;
  return response;
}

/**
 * Gets company reports with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
export async function companyReports(
  token: string,
  symbol: string
): Promise<CompanyReports> {
  const response = (await request(
    token,
    'GET',
    `balanceSheet?id=${symbol}`
  )) as CompanyReports;
  return response;
}

/**
 * Gets analysts recommendations with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
export async function analystsRecommendations(
  token: string,
  symbol: string
): Promise<AnalystsRecommendation[]> {
  const response = (await request(
    token,
    'GET',
    `charts/analysts?id=${symbol}`
  )) as AnalystsRecommendation[];
  return response;
}

/**
 * Gets company reports with an authenticated user.
 *
 * @param token - Authentication token
 * @param symbol - Stock Symbol to search for
 */
export async function cashFlowList(
  token: string,
  symbol: string
): Promise<CashFlowList> {
  const response = (await request(
    token,
    'GET',
    `cashFlow?id=${symbol}`
  )) as CashFlowList;
  return response;
}
