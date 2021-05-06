import React from 'react';
import { render } from '@testing-library/react';
import StyledNumberFormat from './StyledNumberFormat';

describe('StyledNumberFormat', () => {
  test('displays value correctly', () => {
    const styledNumberFormat = render(<StyledNumberFormat value={123.5} />);
    expect(styledNumberFormat.getByText('123,50')).toBeInTheDocument();
  });
  test('adds correct suffix', () => {
    const styledNumberFormat = render(
      <StyledNumberFormat value={123.5} suffix="€" />
    );
    expect(styledNumberFormat.getByText('123,50 €')).toBeInTheDocument();
  });
  test('limits length correctly', () => {
    const styledNumberFormat = render(
      <StyledNumberFormat value={1500000} suffix="€" doLimit />
    );
    expect(styledNumberFormat.getByText('1,50M €')).toBeInTheDocument();
  });
});
