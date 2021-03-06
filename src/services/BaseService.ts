import { AppError } from '../Errors';
import StorageService from './StorageService';

export type MethodType =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export class BaseService {
  static baseUrl = 'https://api.milou.io/';

  /**
   * Basic request to the milou api.
   * @param method Request method.
   * @param endpoint Request endpoint.
   * @param headers Request headers.
   * @param body Request body.
   * @returns Response
   */
  public static async request(
    method: MethodType,
    endpoint: string,
    headers?: HeadersInit,
    body?: Record<string, unknown>
  ): Promise<Response> {
    const absoluteUrl = new URL(endpoint, this.baseUrl).toString();
    return fetch(absoluteUrl, {
      method,
      body: JSON.stringify(body),
      headers,
    });
  }

  /**
   * Makes an authenticated request to the server, with the token saved in localStorage.
   * If no token is saved throws an error.
   * @param method Request method
   * @param endpoint Request endpoint
   * @param body Request body
   * @returns Response from request
   */
  public static async authenticatedRequest(
    method: MethodType,
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit
  ): Promise<Response> {
    const token = StorageService.getToken();
    if (!token) {
      throw new AppError('AUTH_USER_NOT_LOGGED_IN');
    }

    return this.request(
      method,
      endpoint,
      {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body
    );
  }

  /**
   * Checks if a response is ok.
   * @param response Response to be checked.
   * @returns True if response ok, false if not.
   */
  public static async isOk(response: Promise<Response>): Promise<boolean> {
    try {
      return (await response).ok;
    } catch {
      return false;
    }
  }
}
