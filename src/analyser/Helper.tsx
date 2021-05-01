import React from 'react';
import * as API from './APIClient';

// Calculates percentage buy/sell/hold for Analysts section
// multiplied by 1 to prevent issue with string concatenation
export function getPercentage(val: API.AnalystsRecommendation[]): number {
  let percentage = 0;
  if (val.length > 0) {
    percentage =
      (val[0].buy * 100 + val[0].hold * 50 + val[0].sell * 0) /
      (val[0].buy * 1 + val[0].hold * 1 + val[0].sell * 1);
  }
  return percentage;
}

// Decides what to  Message to display on Hover in Analysts setion Bar
export function getDescription(val: number): string {
  let description = 'Buy';
  if (val <= 33) {
    description = 'Sell';
  } else if (val <= 66) {
    description = 'Hold';
  }
  return description;
}

// Used in BalanceSheetInfo to check on NaN values and to Format the number to millions
export function checkValue(val: number): number {
  let result = val;
  if (val.toString() === 'NaN') {
    result = 0;
  } else {
    result = val / 1000000;
  }
  return parseFloat(result.toFixed(2));
}

// Used In BalanceSheetInfo returns empty String when number is zero for styling purposes and adds in Milllion €
export function checkName(val: number, text: string): string {
  let result = text;
  if (val === 0) {
    result = '';
  } else {
    result = `${result} in Million €`;
  }
  return result;
}

// TODO: no hard coded colors
// takes a percent value and converts it to a color
export function convertPercentToColor(val: number): string {
  return val < 0 ? '#D64745' : '#50E2A8';
}

// Used in DetailsHeader to display the Symbol when the name is to Long to Display
export function chooseSymbol(val: API.Stock): string {
  return val.name.length > 15 ? val.symbol : val.name;
}

// Rounds and adds M=Million, B=Billion and K=Thousand --> American System!!!
export const moneyFormat = (val: number): string => {
  let round = '';
  if (Math.abs(val) >= 1.0e9) {
    round = `${Math.round(Math.abs(val) / 1.0e9)} B`;
  } else if (Math.abs(val) >= 1.0e6) {
    round = `${Math.round(Math.abs(val) / 1.0e6)} M`;
  } else if (Math.abs(val) >= 1.0e3) {
    round = `${Math.round(Math.abs(val) / 1.0e3)} K`;
  } else {
    round = `${Math.abs(val)}`;
  }
  return round;
};

// Adds % Symbol
export const convertToPercent = (num: number): string => `${num}%`;
