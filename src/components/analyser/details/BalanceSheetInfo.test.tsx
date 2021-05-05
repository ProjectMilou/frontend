import React from 'react';
import { render } from '@testing-library/react';
import BalanceSheetInfo from './BalanceSheetInfo';
import { MockCompanyReports } from '../../../analyser/APIMocks';

describe('BalanceSheetInfo', () => {
  test('display Balance Sheet Info texts', () => {
    const { queryByText } = render(
      <BalanceSheetInfo companyReports={MockCompanyReports} />
    );
    expect(
      queryByText('analyser.details.BalanceSheetHeader')
    ).toBeInTheDocument();
    expect(
      queryByText('analyser.details.BalanceSheet.Assets')
    ).toBeInTheDocument();
    expect(
      queryByText('analyser.details.BalanceSheet.Liabilities')
    ).toBeInTheDocument();
  });
});
