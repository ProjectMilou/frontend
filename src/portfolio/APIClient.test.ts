import {
  create,
  deletePortfolio,
  details,
  duplicate,
  list,
  modify,
  rename,
  stockSearch,
} from './APIClient';
import { MockDetails, MockOverview, MockOverviewTwo } from './APIMocks';
import StorageService from '../services/StorageService';

describe('Portfolio API client', () => {
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

  describe('list', () => {
    const apiCall = () => list();

    // TODO: unskip when mock portfolio is removed
    test.skip('returns portfolios on success', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          portfolios: [
            {
              ...MockOverview,
              modified: 0,
            },
            {
              ...MockOverviewTwo,
              modified: 1616086585,
            },
          ],
        })
      );
      await expect(apiCall()).resolves.toEqual([MockOverview, MockOverviewTwo]);
    });

    errorHandlingTests(apiCall);
  });

  describe('details', () => {
    const apiCall = () => details('0');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          ...MockDetails,
          overview: {
            ...MockDetails.overview,
            modified: 1616086585,
          },
          nextDividend: 0,
        })
      );
      await expect(apiCall()).resolves.toEqual(MockDetails);
    });

    errorHandlingTests(apiCall);
  });

  describe('rename', () => {
    const apiCall = () => rename('0', 'newName');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      await expect(apiCall()).resolves.toBeUndefined();
    });

    errorHandlingTests(apiCall);
  });

  describe('duplicate', () => {
    const apiCall = () => duplicate('0', 'newName');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ id: '1' }));
      await expect(apiCall()).resolves.toEqual('1');
    });

    errorHandlingTests(apiCall);
  });

  describe('delete', () => {
    const apiCall = () => deletePortfolio('0');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      await expect(apiCall()).resolves.toBeUndefined();
    });

    errorHandlingTests(apiCall);
  });

  describe('create', () => {
    const apiCall = () => create('name');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ id: '0' }));
      await expect(apiCall()).resolves.toEqual('0');
    });

    errorHandlingTests(apiCall);
  });

  describe('modify', () => {
    const apiCall = () => modify('0', [{ symbol: '0', qty: 5 }]);

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      await expect(apiCall()).resolves.toBeUndefined();
    });

    errorHandlingTests(apiCall);
  });

  describe('stockSearch', () => {
    const apiCall = () => stockSearch('GME');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ stocks: [{ symbol: 'GME', name: 'Gamestonk' }] })
      );
      await expect(apiCall()).resolves.toEqual([
        { symbol: 'GME', name: 'Gamestonk' },
      ]);
    });

    errorHandlingTests(apiCall);
  });
});

export {};
