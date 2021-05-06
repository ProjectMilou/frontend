import { render, screen } from '@testing-library/react';
import * as React from 'react';
import RatioDonut from './RatioDonut';

describe('RatioDonut', () => {
  const renderComponent = () =>
    render(<RatioDonut ratio={50} textColor="white" />);

  test('Renders donut with text', () => {
    const { container } = renderComponent();

    screen.getByText('50.0%');

    expect(
      container.querySelector('[class *= makeStyles-chartWrapper]')
    ).toBeInTheDocument();
  });
});
