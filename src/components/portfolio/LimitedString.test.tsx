import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LimitedString from './LimitedString';

describe('LimitedString', () => {
  test('does not change string with less length', () => {
    const limitedString = render(<LimitedString value="Short string." />);
    expect(limitedString.getByText('Short string.')).toBeInTheDocument();
  });
  test('limits the length correctly', async () => {
    const longText =
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
    const limitedString = render(
      <LimitedString value={longText} length={15} />
    );
    const shortText = limitedString.getByText(
      `${longText.substring(0, 16)}...`
    );
    expect(shortText).toBeInTheDocument();
    act(() => {
      userEvent.hover(shortText);
    });
    const tooltipText = await limitedString.findByText(longText);
    expect(tooltipText).toBeInTheDocument();
  });
});
