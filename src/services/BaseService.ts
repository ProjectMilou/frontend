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

  public static async request(
    method: MethodType,
    endpoint: string,
    headers?: HeadersInit,
    body?: any
  ): Promise<Response> {
    const absoluteUrl = new URL(endpoint, this.baseUrl).toString();
    return fetch(absoluteUrl, {
      method,
      body: JSON.stringify(body),
      headers,
    });
  }
}
