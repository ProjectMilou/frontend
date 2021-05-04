import React from 'react';
import { render } from '@testing-library/react';
import SearchOption from './SearchOption';
import { MockOverview } from '../../../analyser/APIMocks';

describe('SearchOption', () => {
  test('shows Search Options correctly', async () => {
    const { queryByText } = render(<SearchOption stock={MockOverview} />);
    expect(queryByText(MockOverview.name)).toBeInTheDocument();
  });
});
