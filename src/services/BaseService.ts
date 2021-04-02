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
    body?: Record<string, any>
  ): Promise<Response> {
    const absoluteUrl = new URL(endpoint, this.baseUrl).toString();
    return fetch(absoluteUrl, {
      method,
      body: JSON.stringify(body),
      headers,
    });
  }
}
