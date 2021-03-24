import { render } from '@testing-library/react';
import * as React from 'react';
import DashboardHeader from './DashboardHeader';

describe('DashboardHeader', () => {
  test('display header text', () => {
    const { getByText } = render(<DashboardHeader />);
    expect(getByText('portfolio.dashboard.headerText')).toBeInTheDocument();
  });
});
