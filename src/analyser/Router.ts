import { navigate } from '@reach/router';

/**
 * Navigates to a stock details page.
 *
 * @param symbol - A stock symbol.
 */
export async function stockDetails(symbol: string): Promise<void> {
  await navigate(`/analyser/${symbol}`);
}
