import { render } from '@testing-library/react';
import * as React from 'react';
import AboutUs from './AboutUs';

describe('AboutUs', () => {
  test('should render aboutus-page', async () => {
    const { container } = render(<AboutUs />);
    expect(container).toMatchSnapshot();
  });
});
