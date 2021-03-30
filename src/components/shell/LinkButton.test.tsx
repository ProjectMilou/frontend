import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import LinkButton from './LinkButton';

describe('LinkButton', () => {
  test('should render given text', async () => {
    const handleEvent = () => {};
    const text = 'Button';
    render(<LinkButton handleEvent={handleEvent} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('should handle event', async () => {
    const handleEvent = jest.fn();
    const text = 'Button';
    const { getByRole } = render(
      <LinkButton handleEvent={handleEvent} text={text} />
    );
    fireEvent.click(getByRole('button'));
    expect(handleEvent).toHaveBeenCalledTimes(1);
  });
});
