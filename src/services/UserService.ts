import { navigate } from '@reach/router';
import { BaseService, MethodType } from './BaseService';

export interface IUserProfile {
  firstName?: string;
  lastName?: string;
  user?: {
    id?: string;
  };
}

enum Endpoints {
  Edit = 'user/edit',
  Profile = 'user/profile',
  Login = 'user/login',
}

export class UserService extends BaseService {
  private static localStorageTokenID = 'token';

  private static getToken() {
    return localStorage.getItem(this.localStorageTokenID);
  }

  private static setToken(token: string) {
    localStorage.setItem(this.localStorageTokenID, token);
  }

  public static async authenticatedRequest(
    method: MethodType,
    endpoint: string,
    body?: any
  ): Promise<Response> {
    const token = this.getToken();
    if (!token) {
      throw new Error('User is not logged in!');
    }

    return this.request(
      method,
      endpoint,
      {
        Authorization: `Bearer ${token}`,
      },
      body
    );
  }

  public static async getProfile(): Promise<IUserProfile> {
    const response = await this.authenticatedRequest('GET', Endpoints.Profile);

    if (!response.ok) throw new Error('Could not get profile!');

    const userProfile = await response.json();
    return userProfile;
  }

  public static async editProfile(
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    try {
      const response = await this.authenticatedRequest('PUT', Endpoints.Edit, {
        firstName,
        lastName,
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  public static async deleteProfile(): Promise<boolean> {
    try {
      const response = await this.authenticatedRequest(
        'DELETE',
        Endpoints.Profile
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  public static async login(email: string, password: string): Promise<boolean> {
    const response = await this.request(
      'POST',
      Endpoints.Login,
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

  public static logout(): void {
    localStorage.removeItem(this.localStorageTokenID);
    if (window.location.pathname === '/profile') {
      navigate('/');
    }
  }

  public static isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }
}
