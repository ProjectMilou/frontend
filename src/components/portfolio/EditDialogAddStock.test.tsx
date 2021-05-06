import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { AddEntryProps } from './EditDialog';
import EditDialogAddStock from './EditDialogAddStock';
import * as API from '../../portfolio/APIClient';

jest.mock('../../portfolio/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

describe('EditDialogAddStock', () => {
  const defaultProps: AddEntryProps = {
    ids: [],
    add: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<AddEntryProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<EditDialogAddStock {...props} />),
      props,
    };
  };

  test('searches stocks initially', async () => {
    const { container } = renderComponent();
    const input = container.querySelector('input')!;
    expect(input.placeholder).toEqual('portfolio.dialog.edit.search');
    await waitFor(() => {
      expect(mockAPI.stockSearch).toHaveBeenCalledWith('');
    });
  });

  test('shows search results', async () => {
    mockAPI.stockSearch.mockResolvedValue([]);
    const { findByText } = renderComponent();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'asdf' },
    });
    expect(mockAPI.stockSearch).toHaveBeenCalledWith('asdf');
    await findByText('noResults');
  });
});
