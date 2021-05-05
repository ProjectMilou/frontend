import { render } from '@testing-library/react';
import * as React from 'react';
import Imprint from './Imprint';

describe('Imprint', () => {
  test('should render imprint page', async () => {
    const { container } = render(<Imprint />);
    expect(container).toMatchSnapshot();
  });
});
