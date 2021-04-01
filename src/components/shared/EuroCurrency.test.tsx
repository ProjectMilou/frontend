import { render } from '@testing-library/react';
import * as React from 'react';
import EuroCurrency, { EuroCurrencyProps } from './EuroCurrency';

describe('EuroCurrency', () => {
  const defaultProps: EuroCurrencyProps = {
    value: 1337.69,
  };

  const renderComponent = (newProps?: Partial<EuroCurrencyProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<EuroCurrency {...props} />),
      props,
    };
  };

  test('format currency', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('always print decimal places', () => {
    const { container } = renderComponent({ value: 1337 });
    expect(container).toMatchSnapshot();
  });

  test('only print 2 decimal places', () => {
    const { container } = renderComponent({ value: 13.371234 });
    expect(container).toMatchSnapshot();
  });
});
