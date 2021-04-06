import { Position } from './APIClient';

/** Maps elements of a risk category (e.g. country) to a total value. */
export type RiskPortions = {
  [category: string]: number;
};

/**
 * Calculates the total value of all stocks in the portfolio that have the same
 * element in a risk category (e.g. country) for all risk elements that are part
 * of the portfolio.
 *
 * TODO: change to percentage?
 *
 * @example <caption>Example usage with countries.</caption>
 * riskPortions(positions, (p) => p.stock.country);
 * // possible return value: {'Germany': 1337, 'USA': 420.69}
 *
 * @param positions - Portfolio positions
 * @param getCategory - Function that takes a position and returns its risk category
 * @return A mapping from risk category entries to total portfolio value.
 */
export function riskPortions(
  positions: Position[],
  getCategory: (position: Position) => string
): RiskPortions {
  return positions.reduce<RiskPortions>((acc, p) => {
    const category = getCategory(p);
    const value = p.stock.price * p.qty;
    return {
      ...acc,
      [category]: category in acc ? acc[category] + value : value,
    };
  }, {});
}
