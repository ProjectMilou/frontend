import { BaseService } from '../BaseService';
import StorageService from '../StorageService';

describe('BaseService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('authenticated request', () => {
    test('throws error when no token available', async () => {
      StorageService.removeToken();

      const apiCall = () => BaseService.authenticatedRequest('GET', 'dummy');

      await expect(apiCall).rejects.toMatchInlineSnapshot(
        '[Error: AUTH_TOKEN_INVALID]'
      );
    });
  });

  describe('request', () => {
    test('throws error', async () => {
      fetchMock.mockRejectOnce(() =>
        Promise.reject(new Error('network error'))
      );

      const apiCall = () => BaseService.request('GET', 'dummy');

      await expect(apiCall).rejects.toThrow();
    });
  });
});
