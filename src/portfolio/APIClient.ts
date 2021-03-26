// TODO: Change to production URL when available
// TODO: Use a common base URL for shell, analyser and portfolio instead of 3 URLs
export const baseURL = 'https://api.milou.io/portfolio';

const headers = { 'Content-Type': 'application/json' };

// Types used by the frontend

export type PortfolioOverview = {
  // TODO: Change id to number to be consistent with backend
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score?: number;
  perf7d: number;
  perf1y: number;
  modified: Date;
};

// Types describing the JSON response of API calls.
// The correctness of these types is assumed, no checks are performed.

type ListResponse = {
  portfolios: {
    id: number;
    name: string;
    virtual: boolean;
    positionCount: number;
    value: number;
    score?: number;
    perf7d: number;
    perf1y: number;
    /** UNIX timestamp */
    modified: number;
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
 * Gets an overview over all portfolios of the authenticated user.
 *
 * @param token - Authentication token
 */
export async function list(token: string): Promise<PortfolioOverview[]> {
  const response = (await request(token, 'GET', 'list')) as ListResponse;
  return response.portfolios.map((p) => ({
    ...p,
    id: p.id.toString(),
    modified: new Date(p.modified),
  }));
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
