import { BaseService } from './BaseService';
import IBank from './models/bank/IBank';
import IBankConnection from './models/bank/IBankConnection';
import IConnectionsResponse from './models/bank/IConnectionsResponse';
import ISearchResponse from './models/bank/ISearchResponse';
import IAddResponse from './models/bank/IAddResponse';

enum Endpoints {
  Search = '/user/bank/search/',
  Connections = '/user/bank/connections/',
  AddConnections = '/user/bank/connections/add/',
  Refresh = '/user/bank/refresh',
}

class BankAccountService extends BaseService {
  /**
   * Searches for finAPI for all banks with given string.
   * @param searchString String to search finAPI with.
   * @returns All banks that match the string.
   */
  public static async search(searchString: string): Promise<IBank[]> {
    const response = await this.request('GET', Endpoints.Search + searchString);
    const paginatedBanks: ISearchResponse = await response.json();

    return paginatedBanks.banks;
  }

  /**
   * Adds a bank to a user.
   * @param bankId BankID of bank to be added.
   * @returns Link to FinAPI webform
   */
  public static async add(bankId: number): Promise<string> {
    const response = await this.authenticatedRequest(
      'POST',
      Endpoints.AddConnections + bankId
    );
    const link: IAddResponse = await response.json();

    return link.link;
  }

  /**
   * Getter for all the bank connections of the current logged in user.
   * @returns All bank connections of a user.
   */
  public static async getConnections(): Promise<IBankConnection[]> {
    const response = await this.authenticatedRequest(
      'GET',
      Endpoints.Connections
    );
    const userConnections: IConnectionsResponse = await response.json();

    return userConnections.bankConnections;
  }

  /**
   * Deletes a bank connection with the given id.
   * @param id ID of bank connection to be deleted.
   * @returns True if successful, false if not.
   */
  public static async deleteConnection(id: string): Promise<boolean> {
    return this.isOk(
      this.authenticatedRequest('DELETE', Endpoints.Connections + id)
    );
  }

  /**
   * Deletes all bank connections of the logged in user.
   * @returns True if successful, false if not.
   */
  public static async deleteAllConnection(): Promise<boolean> {
    return this.isOk(
      this.authenticatedRequest('DELETE', Endpoints.Connections)
    );
  }
}

export default BankAccountService;
