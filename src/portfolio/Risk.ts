import { Position } from './APIClient';

export type RiskPortions = {
  [category: string]: number;
};

/**
 * Calculates the weighted sums of a risk category (e.g. countries)
 *
 * @param positions - Portfolio positions
 * @param getCategory - Function that takes a position and returns its risk category
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
