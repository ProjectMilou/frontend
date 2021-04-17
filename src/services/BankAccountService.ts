import { BaseService } from './BaseService';
import IBank from './models/bank/IBank';
import IBankConnection from './models/bank/IBankConnection';
import IConnectionsResponse from './models/bank/IConnectionsResponse';
import ISearchResponse from './models/bank/ISearchResponse';

enum Endpoints {
  Search = '/user/bank/search/',
  Connections = '/user/bank/connections',
  AddConnections = '/user/bank/connections/add/',
  Refresh = '/user/bank/refresh',
}

class BankAccountService extends BaseService {
  public static async search(searchString: string): Promise<IBank[]> {
    const response = await this.request('GET', Endpoints.Search + searchString);
    const paginatedBanks: ISearchResponse = await response.json();

    return paginatedBanks.banks;
  }

  public static async add(bankId: string): Promise<boolean> {
    try {
      const response = await this.authenticatedRequest(
        'POST',
        Endpoints.AddConnections + bankId
      );

      return response.ok;
    } catch {
      return false;
    }
  }

  public static async getConnections(): Promise<IBankConnection[]> {
    const response = await this.authenticatedRequest(
      'GET',
      Endpoints.Connections
    );
    const userConnections: IConnectionsResponse = await response.json();

    return userConnections.bankConnections;
  }
}

export default BankAccountService;
