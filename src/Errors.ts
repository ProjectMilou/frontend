export type ErrorCode =
  | 'UNKNOWN'
  | 'AUTH_TOKEN_INVALID'
  | 'AUTH_TOKEN_EXPIRED'
  | 'PORTFOLIO_ID_INVALID'
  | 'PORTFOLIO_NAME_INVALID'
  | 'PORTFOLIO_NAME_DUPLICATE'
  | 'ISIN_INVALID'
  | 'QTY_INVALID'
  | 'RANGE_INVALID'
  | 'REAL_PORTFOLIO_MODIFICATION';

export function errorMessageKey(code: ErrorCode): string {
  return `error.message.${code}`;
}

export function errorTitleKey(code: ErrorCode): string {
  return `error.title.${code}`;
}
