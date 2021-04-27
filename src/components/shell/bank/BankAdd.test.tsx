import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BankAdd from './BankAdd';

describe('BankSearch', () => {
  test('Search field exists', () => {
    render(<BankAdd />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // We cannot reliably test if search results are shown
  // since this is API dependent.
});
