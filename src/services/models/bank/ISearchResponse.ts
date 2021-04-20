import IPaging from '../common/IPaging';
import IBank from './IBank';

interface ISearchResponse {
  banks: IBank[];
  paging: IPaging;
}

export default ISearchResponse;
