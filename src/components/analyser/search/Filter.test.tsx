import React from 'react';
import { render } from '@testing-library/react';
import Filter from './Filter';
import { MockOverview, MockFilters } from '../../../analyser/APIMocks';

describe('Filter', () => {
  test('shows filters', async () => {
    const { queryByText } = render(
      <Filter
        stocks={[MockOverview]}
        filters={MockFilters}
        setFilters={jest.fn()}
      />
    );
    expect(queryByText('analyser.filter.clear')).toBeInTheDocument();
  });
});
