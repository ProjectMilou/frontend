import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsHeader from './DetailsHeader';
import { MockOverview } from '../../../analyser/APIMocks';

const renderComponent = () => ({
  ...render(<DetailsHeader stock={MockOverview} back={jest.fn()} />),
});

describe('DetailsHeader', () => {
  test('Details header renders correctly', async () => {
    const { queryByText } = renderComponent();
    expect(queryByText(MockOverview.symbol)).toBeInTheDocument();

    // testing back button
    const backButton = screen.getByRole('button', { name: 'back' });
    await userEvent.click(backButton);
  });
});
