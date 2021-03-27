import { render, screen } from '@testing-library/react';
import BankSearch from './BankSearch';

describe('BankSearch', () => {
  test('Search field exists', () => {
    render(<BankSearch />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // We cannot reliably test if search results are shown
  // since this is API dependent.
});
