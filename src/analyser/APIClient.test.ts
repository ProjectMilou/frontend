// Based on portfolio teams test component
import { Filters, listStocks, stockOverview } from './APIClient';
import { MockOverview, MockOverviewTwo } from './APIMocks';
import StorageService from '../services/StorageService';

describe('Analyser API client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    StorageService.setToken('dummy');
  });

  /**
   * Error handling tests that should be executed for each API call.
   *
   * @param apiCall The API call to be tested
   */
  const errorHandlingTests = (apiCall: () => Promise<unknown>) => {
    test('rejects on error with non-JSON response', async () => {
      fetchMock.mockResponseOnce('This is not JSON.', { status: 400 });
      await expect(apiCall()).rejects.toMatchInlineSnapshot(`[Error: UNKNOWN]`);
    });

    test('rejects on failed request', async () => {
      fetchMock.mockRejectOnce(() =>
        Promise.reject(new Error('network error'))
      );
      await expect(apiCall()).rejects.toMatchInlineSnapshot(
        `[Error: network error]`
      );
    });

    test('rejects with JSON error', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ error: 'AUTH_TOKEN_INVALID' }),
        { status: 400 }
      );
      await expect(apiCall()).rejects.toMatchInlineSnapshot(
        `[Error: AUTH_TOKEN_INVALID]`
      );
    });
  };

  // list stocks with empty filters
  describe('list', () => {
    const emptyFilters: Filters = {
      country: [],
      industry: [],
      currency: [],
      mc: [],
    };

    const apiCall = () => listStocks(emptyFilters);

    test.skip('returns stock list on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      const response = await apiCall();
      // console.log(apiCall);
      const modified = response.map((s) => ({ ...s, date: new Date(0) }));

      // console.log(modified);
      expect(modified).toContain(MockOverview);
      expect(modified).toContain(MockOverviewTwo);
    });

    errorHandlingTests(apiCall);
  });

  // stock overview of IBM
  describe('overview', () => {
    const apiCall = () => stockOverview('IBM');

    test.skip('resolves on success', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          ...MockOverview,
        })
      );
      await expect(apiCall()).resolves.toEqual(MockOverview);
    });

    errorHandlingTests(apiCall);
  });
});

export {};
