import { navigate } from '@reach/router';

/**
 * Navigates to a portfolio details page.
 *
 * @param id - A portfolio ID.
 */
export async function portfolioDetails(id: string): Promise<void> {
  await navigate(`/portfolio/${id}`);
}

/**
 * Navigates to the portfolio dashboard.
 */
export async function portfolioDashboard(): Promise<void> {
  await navigate('/portfolio');
}

/**
 * Navigates to a stock details page.
 *
 * @param symbol - A stock symbol.
 */
export async function stockDetails(symbol: string): Promise<void> {
  await navigate(`/analyser/${symbol}`);
}
