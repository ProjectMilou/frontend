// type declarations
export type PortfolioDetails = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score: number;
  perf7d: number;
  perf1y: number;
  modified: number;
  positions: Position[];
  risk: RiskAnalysis;
  keyFigures: KeyFigures[];
  nextDividend: number;
  dividendPayoutRatio: number;
};

export type Position = {
  stock: Stock;
  qty: number;
};

export type Stock = {
  isin: string;
  symbol: string;
  name: string;
  price: number;
  perf7d: number;
  perf1y: number;
  country: string;
  industry: string;
  score: number;
};

export type RiskAnalysis = {
  countries: Risk;
  segments: Risk;
  currency: Risk;
};

export type Risk = {
  score: number;
  warnings: string[];
};

export type KeyFigures = {
  year: number;
  pte: number;
  ptb: number;
  ptg: number;
  eps: number;
  div: number;
};
