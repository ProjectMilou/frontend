import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { Position } from './APIClient';

/** Icons to be used in the risk section */
const exclamationIcon = (color: string) => (
  <PriorityHighIcon
    style={{ color, width: '100%', height: '100%' }}
    aria-label="exclamationIcon"
  />
);

const warningIcon = (color: string) => (
  <WarningIcon
    style={{ color, width: '100%', height: '100%' }}
    aria-label="warningIcon"
  />
);

const checkIcon = (color: string) => (
  <CheckIcon
    style={{ color, width: '100%', height: '100%' }}
    aria-label="checkIcon"
  />
);

export type RiskBundle = {
  count: number;
  riskColor: string;
  riskIcon: JSX.Element;
  warnings: string[];
};

/**
 * @param type - The type of risk to be evaluated
 * @param count - The number of of countries, segments or currencies
 * @param threshold1 - The first threshold: Up to this number (exclusive)
 * the text color will be red and the icon will be an exlamation mark
 * @param threshold2 - The second threshold: Up to this number (exclusive)
 * the text color will be yellow and the icon will be an warning sign.
 * Any thing past threshold2 will be green
 * @param red - The color for red
 * @param yellow - The color for yellow
 * @param green - The color for green
 * @return An object containing the count, color, icon and a list of warnings
 * for a given risk type
 */
export function getRiskBundle(
  type: 'country' | 'segment' | 'currency',
  count: number,
  threshold1: number,
  threshold2: number,
  red: string,
  yellow: string,
  green: string
): RiskBundle {
  switch (true) {
    // score category 'red'
    case count < threshold1:
      return {
        count,
        riskColor: red,
        riskIcon: exclamationIcon(red),
        warnings: [`portfolio.details.warnings.${type}0`],
      };
    // score category 'yellow'
    case count < threshold2:
      return {
        count,
        riskColor: yellow,
        riskIcon: warningIcon(yellow),
        warnings: [`portfolio.details.warnings.${type}1`],
      };
    // score category 'green'
    default:
      return {
        count,
        riskColor: green,
        riskIcon: checkIcon(green),
        warnings: [],
      };
  }
}

export type CollectedStocks = {
  [key: number]: string;
};

/**
 * @param positions - The positions of a givin portfolio
 * @param volatility - Whether this accumulation is for the volatility section (false for analyst)
 * @return An object containing the value as a key and the names of all stocks with that given value
 */

export function collectStocks(
  positions: Position[],
  volatility: boolean
): CollectedStocks {
  const collectedStocks: CollectedStocks = {};

  if (positions) {
    Object.values(positions)
      // sort by total value (largest to smallest)
      .sort((a, b) => b.qty * b.stock.price - a.qty * a.stock.price)
      // take the top 5
      .slice(0, 5)
      .forEach((p) => {
        // check whether volatility or stock score is to be used as the key
        const val = volatility
          ? Math.round(p.stock.volatility * 100) / 100
          : Math.round(p.stock.score * 100);

        if (!collectedStocks[val]) {
          // if there is no entry with this score create one
          collectedStocks[val] = p.stock.name;
        } else {
          // otherwise add on to an existing score
          collectedStocks[val] = collectedStocks[val].concat(
            `\n${p.stock.name}`
          );
        }
      });
  }

  return collectedStocks;
}

/**
 * This function takes in a number and returns a number with a maximum of four digits after the comma
 * E.g. used for the y-axis formatting of apex-charts components
 * @param value - Numeric value that needs to be rounded
 * @param decimals - Number that represents the digits after comma, default is 10000 (4 digits after comma)
 */
export function roundAxis(value: number, decimals = 100): number {
  return Math.round(value * decimals) / decimals;
}

/**
 * This function limits a string to a certain length
 * E.g. used for the y-axis formatting of apex-charts components
 * @param value - String that is to be limited
 * @param length - max length of the string, default is 20 characters
 */
export function limitString(value: string, length = 20): string {
  if (value.length > length) return `${value.substring(0, length + 1)}...`;
  return value;
}
