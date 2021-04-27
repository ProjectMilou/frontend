import BankAccountService from '../BankAccountService';
import IConnectionsResponse from '../models/bank/IConnectionsResponse';
import ISearchResponse from '../models/bank/ISearchResponse';
import StorageService from '../StorageService';

describe('BankAccountService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    StorageService.setToken('fakeToken');
  });

  test('get connections returns only connections', async () => {
    const mock: IConnectionsResponse = {
      bankConnections: [
        {
          accountIds: [123],
          bankConnectionId: 'asdfa',
          created: 'date 1',
          modified: 'date 2',
          name: 'bankname',
        },
      ],
      userId: 'random',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mock));
    const connections = await BankAccountService.getConnections();

    expect(connections).toStrictEqual(mock.bankConnections);
  });

  test('search request returns only the banks without pagination', async () => {
    const mock: ISearchResponse = {
      banks: [
        {
          id: 123,
          name: 'asdf',
          blz: '123',
          isTestBank: true,
          popularity: 1,
          interfaces: [],
          loginCredentials: [],
          properties: 'DECOUPLED_APPROACH',
          health: 1,
        },
      ],
      paging: {
        page: 1,
        perPage: 2,
        pageCount: 3,
        totalCount: 4,
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mock));
    const banks = await BankAccountService.search('random');
    expect(banks).toStrictEqual(mock.banks);
  });
});
