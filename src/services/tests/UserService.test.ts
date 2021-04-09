import { BaseService } from '../BaseService';
import { ILoginResponse } from '../models/user/ILoginResponse';
import StorageService from '../StorageService';
import UserService from '../UserService';

describe('UserService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    StorageService.removeToken();
  });

  test('login saves token in storage', async () => {
    const mock: ILoginResponse = {
      token: 'abcd',
      user: {
        id: 'test@milo.de',
        email: 'test@milo.de',
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mock));
    await UserService.login('test@milo.de', 'randomando');

    expect(StorageService.getToken()).toBe(mock.token);
  });

  test('isLoggedIn works correctly', () => {
    expect(UserService.isLoggedIn()).toBeFalsy();
    StorageService.setToken('dummy');
    expect(UserService.isLoggedIn()).toBeTruthy();
  });

  test('can log a user out', () => {
    StorageService.setToken('dummy');
    UserService.logout();
    expect(StorageService.getToken()).toBeFalsy();
  });
});
