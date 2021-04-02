import { BaseService, MethodType } from './BaseService';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  user?: {
    id?: string;
  };
}

export class UserService extends BaseService {
  static profileEndpoint = 'user/profile';
  static loginEndpoint = 'user/login';
  static localStorageTokenID = 'token';

  static getToken() {
    return localStorage.getItem(this.localStorageTokenID);
  }

  static setToken(token: string) {
    localStorage.setItem(this.localStorageTokenID, token);
  }

  public static async authenticatedRequest(
    method: MethodType,
    endpoint: string,
    body?: any
  ): Promise<Response> {
    const token = this.getToken();
    if (!token) {
      throw 'User is not logged in!';
    }

    return this.request(
      method,
      endpoint,
      {
        Authorizatioin: `Bearer ${token}`,
      },
      body
    );
  }

  public static async getProfile(): Promise<UserProfile> {
    const response = await this.authenticatedRequest(
      'GET',
      this.profileEndpoint
    );
    return await response.json();
  }

  public static async editProfile(
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    try {
      const response = await this.authenticatedRequest(
        'PUT',
        this.profileEndpoint,
        {
          firstName,
          lastName,
        }
      );

      return response.ok;
    } catch {
      return false;
    }
  }

  public static async deleteProfile(): Promise<boolean> {
    try {
      const response = await this.authenticatedRequest(
        'DELETE',
        this.profileEndpoint
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  public static async login(email: string, password: string): Promise<boolean> {
    const response = await this.request(
      'POST',
      this.loginEndpoint,
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      {
        email,
        password,
      }
    );

    if (!response.ok) return false;

    const data = await response.json();

    if (!data || !data.token) return false;

    this.setToken(data.token);
    return true;
  }
}
