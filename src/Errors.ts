/** Error codes for application errors. */
export type ErrorCode =
  | 'UNKNOWN'
  | 'AUTH_TOKEN_INVALID'
  | 'AUTH_TOKEN_EXPIRED'
  | 'PORTFOLIO_ID_INVALID'
  | 'PORTFOLIO_NAME_INVALID'
  | 'PORTFOLIO_NAME_DUPLICATE'
  | 'SYMBOL_INVALID'
  | 'QTY_INVALID'
  | 'RANGE_INVALID'
  | 'REAL_PORTFOLIO_MODIFICATION';

/**
 * An application error.
 */
export class AppError extends Error {
  appErrorCode: ErrorCode;

  constructor(code: ErrorCode) {
    super(code);
    this.appErrorCode = code;
  }
}

/**
 * Returns the {@link ErrorCode} for application errors or 'UNKNOWN' for all other errors.
 *
 * @param e - An error.
 * @return - An error code.
 */
function getErrorCode(e: AppError | Error): ErrorCode {
  return 'appErrorCode' in e ? e.appErrorCode : 'UNKNOWN';
}

/**
 * Gets the translation key for the error message.
 *
 * @param e - An error.
 * @return - The translation key for the error message.
 */
export function errorMessageKey(e: Error): string {
  return `error.message.${getErrorCode(e)}`;
}

/**
 * Gets the translation key for the error title.
 * The title is a short error description that can be used in dialogs etc.
 *
 * @param e - An error.
 * @return - The translation key for the error title.
 */
export function errorTitleKey(e: Error): string {
  return `error.title.${getErrorCode(e)}`;
}

/**
 * Returns `true` if and only if an error is an authentication error.
 *
 * @param e - An error.
 * @return - `true` if and only if the error is an authentication error.
 */
export function isAuthenticationError(e: Error): boolean {
  return getErrorCode(e).startsWith('AUTH');
}
