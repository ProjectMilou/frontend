import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsMainPositions from './DetailsMainPositions';
import { MockPositions } from '../../portfolio/APIMocks';

describe('DetailsMainPositions', () => {
  const renderComponent = () =>
    render(<DetailsMainPositions positions={MockPositions} />);

  test('DetailsMainPositions renders', () => {
    renderComponent();

    screen.getByText('BMW');
    screen.getAllByText('portfolio.details.amount:');
    screen.getAllByText('portfolio.details.day7');
    screen.getAllByText('portfolio.details.year');
  });
});
