import { render } from '@testing-library/react';
import * as React from 'react';
import ResetChange from './ResetChange';

describe('ResetChange', () => {
  test('should render reset page', async () => {
    const { container } = render(<ResetChange />);
    expect(container).toMatchSnapshot();
  });
});
