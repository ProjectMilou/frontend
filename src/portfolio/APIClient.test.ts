import { deletePortfolio, duplicate, list, rename } from './APIClient';
import { MockOverview, MockOverviewTwo } from './APIMocks';

describe('Portfolio API client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
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
      await expect(apiCall()).rejects.toMatchInlineSnapshot(`[Error: UNKNOWN]`);
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
    const apiCall = () => list('');

    test('returns portfolios on success', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          portfolios: [
            {
              id: 1,
              name: 'test',
              virtual: true,
              positionCount: 3,
              value: 9,
              perf7d: -1.23,
              perf1y: 13.37,
              modified: 0,
            },
            {
              id: 2,
              name: 'testTwo',
              virtual: false,
              positionCount: 4,
              value: 3,
              score: 20,
              perf7d: 0,
              perf1y: -1,
              modified: 1616086585,
            },
          ],
        })
      );
      await expect(apiCall()).resolves.toEqual([MockOverview, MockOverviewTwo]);
    });

    errorHandlingTests(apiCall);
  });

  describe('rename', () => {
    const apiCall = () => rename('', '0', 'newName');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      await expect(apiCall()).resolves.toBeUndefined();
    });

    errorHandlingTests(apiCall);
  });

  describe('duplicate', () => {
    const apiCall = () => duplicate('', '0', 'newName');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ id: '1' }));
      await expect(apiCall()).resolves.toEqual('1');
    });

    errorHandlingTests(apiCall);
  });

  describe('delete', () => {
    const apiCall = () => deletePortfolio('', '0');

    test('resolves on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      await expect(apiCall()).resolves.toBeUndefined();
    });

    errorHandlingTests(apiCall);
  });
});

export {};
