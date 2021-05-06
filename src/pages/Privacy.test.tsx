import { render } from '@testing-library/react';
import * as React from 'react';
import Privacy from './Privacy';

describe('Privacy', () => {
  test('should render privacy page', async () => {
    const { container } = render(<Privacy />);
    expect(container).toMatchSnapshot();
  });
});
