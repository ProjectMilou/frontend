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

  /**
   * Getter for user jwt token
   * @returns token
   */
  private static getToken() {
    return localStorage.getItem(this.localStorageTokenID);
  }

  /**
   * Setter for user jwt token
   * @param token token
   */
  private static setToken(token: string) {
    localStorage.setItem(this.localStorageTokenID, token);
  }

  /**
   * Makes an authenticated request to the server, with the token saved in localStorage.
   * If no token is saved throws an error.
   * @param method Request method
   * @param endpoint Request endpoint
   * @param body Request body
   * @returns Response from requst
   */
  public static async authenticatedRequest(
    method: MethodType,
    endpoint: string,
    body?: Record<string, unknown>
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

  /**
   * Getter for the profile data of the logged in user.
   * @returns Profile Data
   */
  public static async getProfile(): Promise<IUserProfile> {
    const response = await this.authenticatedRequest('GET', Endpoints.Profile);

    if (!response.ok) throw new Error('Could not get profile!');

    const userProfile = await response.json();
    return userProfile;
  }

  /**
   * Edits the profile of the logged in user.
   * @param firstName New First Name
   * @param lastName New Last Name
   * @returns True if edit was successful, false if not
   */
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

  /**
   * Deletes the profile of the logged in user.
   * @returns True if delete was successful, false if not
   */
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

  /**
   *
   * @param email Email of user to be logged in.
   * @param password Password of user to be logged in.
   * @returns True if loggin was successful, false if not
   */
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

  /**
   * Loggs the user out and navigates to homepage if the user is in the profile page.
   */
  public static logout(): void {
    localStorage.removeItem(this.localStorageTokenID);
    if (window.location.pathname === '/profile') {
      navigate('/');
    }
  }

  /**
   * Checks if a user is logged in.
   * @returns True if a user is logged in, false if not.
   */
  public static isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }
}
