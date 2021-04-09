import { navigate } from '@reach/router';
import { AppError } from '../Errors';
import { BaseService } from './BaseService';
import { ILoginResponse } from './models/user/ILoginResponse';
import { IUserProfile } from './models/user/IUserProfile';
import { StorageService } from './StorageService';

enum Endpoints {
  Edit = 'user/edit',
  Profile = 'user/profile',
  Login = 'user/login',
  Register = 'user/register',
  RegisterConfirm = 'user/register/confirm',
}

class UserService extends BaseService {
  /**
   * Getter for the profile data of the logged in user.
   * @returns Profile Data
   */
  public static async getProfile(): Promise<IUserProfile> {
    const response = await this.authenticatedRequest('GET', Endpoints.Profile);

    if (!response.ok) throw new AppError('AUTH_TOKEN_INVALID');

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

    const data: ILoginResponse | undefined = await response.json();

    if (!data || !data.token) return false;

    StorageService.setToken(data.token);
    return true;
  }

  /**
   * Loggs the user out and navigates to homepage if the user is in the profile page.
   */
  public static logout(): void {
    StorageService.removeToken();
    if (window.location.pathname === '/profile') {
      navigate('/');
    }
  }

  /**
   * Checks if a user is logged in.
   * @returns True if a user is logged in, false if not.
   */
  public static isLoggedIn(): boolean {
    return Boolean(StorageService.getToken());
  }

  /**
   * Registers a user with email and password.
   * @param email Email of user to be registered
   * @param password Password of user to be registered
   * @returns True if registration request successful, false if not
   */
  public static async register(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await this.request(
        'POST',
        Endpoints.Register,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        {
          email,
          password,
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Email confirmation of registration.
   * @param uuid Confirmation UUID
   * @returns True if register confirmation was successful, false if not.
   */
  public static async registerConfirm(uuid: string): Promise<boolean> {
    try {
      const response = await this.request(
        'POST',
        Endpoints.RegisterConfirm,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        {
          uuid,
        }
      );

      return response.ok;
    } catch {
      return false;
    }
  }
}

export default UserService;
