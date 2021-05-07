import * as React from 'react';
import { render } from '@testing-library/react';
import ShowMoreAccordion from './ShowMoreAccordion';
import { MockPositions } from '../../portfolio/APIMocks';

describe('ShowMoreAccordion', () => {
  const container = render(<ShowMoreAccordion positions={MockPositions} />);

  test('renders show more', () => {
    expect(
      container.getByText(
        `portfolio.details.positions.showMore (${MockPositions.length})`
      )
    ).toBeInTheDocument();
  });
});
