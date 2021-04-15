import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

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
