import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

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
