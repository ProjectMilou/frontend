// TODO: Change to production URL when available
// TODO: Use a common base URL for shell, analyser and portfolio instead of 3 URLs
export const baseURL = 'https://api.milou.io/portfolio';

const headers = { 'Content-Type': 'application/json' };

// Types used by the frontend

// TODO: Use a dictionary object instead of an array to make searching by id easier
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

type DuplicateResponse = {
  id: string;
};

type CreateResponse = {
  id: string;
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
