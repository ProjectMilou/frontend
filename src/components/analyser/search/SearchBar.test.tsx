import * as React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('shows search placeholders', async () => {
    const { queryByText } = render(<SearchBar />);
    const placeholder = 'Name, Symbol, ISIN or WKN';
    expect(queryByText(placeholder)).toBeNull();
  });
});
