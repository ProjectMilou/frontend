import { BaseService } from '../BaseService';
import { StorageService } from '../StorageService';
import UserService from '../UserService';

describe('BaseService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('authenticated request', () => {
    test('throws error when no token available', async () => {
      StorageService.removeToken();
      const rsp = async () =>
        await BaseService.authenticatedRequest('GET', 'dummy');

      expect(rsp).rejects.toMatchInlineSnapshot('[Error: AUTH_TOKEN_INVALID]');
    });
  });

  describe('request', () => {
    test('throws error', async () => {
      fetchMock.mockRejectOnce(() =>
        Promise.reject(new Error('network error'))
      );
      const rsp = async () => await BaseService.request('GET', 'dummy');

      expect(rsp).rejects.toThrow();
    });
  });
});
