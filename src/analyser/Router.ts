import { navigate } from '@reach/router';

/**
 * Navigates to a stock details page.
 *
 * @param symbol - A stock symbol.
 */
async function stockDetails(symbol: string): Promise<void> {
  await navigate(`/analyser/${symbol}`);
}

export default stockDetails;
