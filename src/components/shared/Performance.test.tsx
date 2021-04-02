import { render } from '@testing-library/react';
import * as React from 'react';
import Performance, { PerformanceProps } from './Performance';

describe('Performance', () => {
  const defaultProps: PerformanceProps = {
    value: 13.37,
  };

  const renderComponent = (newProps?: Partial<PerformanceProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<Performance {...props} />),
      props,
    };
  };

  test('format performance', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('always print decimal places', () => {
    const { container } = renderComponent({ value: 1337 });
    expect(container).toMatchSnapshot();
  });

  test('only print 2 decimal places', () => {
    const { container } = renderComponent({ value: -13.371234 });
    expect(container).toMatchSnapshot();
  });
});
