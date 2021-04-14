import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import CheckIcon from '@material-ui/icons/Check';
// import WarningIcon from '@material-ui/icons/Warning';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { Position } from './APIClient';
// import { theme } from '../components/App';

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

// const exclamationIcon = (
//   <PriorityHighIcon
//     style={{ color: theme.palette.error.main, width: '100%', height: '100%' }}
//     aria-label="exclamationIcon"
//   />
// );

// export type RiskBundle = {
//   riskColor: string;
//   riskIcon: JSX.Element;
//   warnings: string[];
// };

// export function getCountryBundle(count: number): RiskBundle {
//   switch (true) {
//     case count < 3:
//       return {
//         riskColor: theme.palette.error.main,
//         riskIcon: exclamationIcon,
//         warnings: ['portfolio.details.warnings.country0'],
//       };
//     default:
//       return {
//         riskColor: theme.palette.success.main,
//         riskIcon: exclamationIcon,
//         warnings: ['portfolio.details.warnings.country0'],
//       };
//       break;
//   }
// }
