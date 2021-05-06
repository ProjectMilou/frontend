import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BankAdd from './BankAdd';
import mockResponse from './BankAddMock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('BankSearch', () => {
  test('Search field exists', () => {
    render(<BankAdd />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('should match snapshot', () => {
    const { container } = render(<BankAdd />);
    expect(container).toMatchSnapshot();
  });

  test('should display fetch response', async () => {
    const { getByRole } = render(<BankAdd />);
    const input = getByRole('textbox') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    fireEvent.change(input, { target: { value: 'a' } });

    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.milou.io/user/bank/search/a',
      expect.objectContaining({ method: 'GET' })
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText(/GAD Test/i)).toBeInTheDocument();
    });
  });
});
