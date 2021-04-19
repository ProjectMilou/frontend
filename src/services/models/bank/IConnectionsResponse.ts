import IBankConnection from './IBankConnection';

interface IConnectionsResponse {
  bankConnections: IBankConnection[];
  userId: string;
}

export default IConnectionsResponse;
