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

  test('should handle click event', async () => {
    const handleEvent = jest.fn();
    const text = 'Button';
    const { getByRole } = render(
      <LinkButton handleEvent={handleEvent} text={text} />
    );
    fireEvent.click(getByRole('button'));
    expect(handleEvent).toHaveBeenCalledTimes(1);
  });

  test('should handle keydown event', async () => {
    const handleEvent = jest.fn();
    const text = 'Button';
    const { getByRole } = render(
      <LinkButton handleEvent={handleEvent} text={text} />
    );
    fireEvent.keyDown(getByRole('button'), { key: 'Enter', code: 'Enter' });
    expect(handleEvent).toHaveBeenCalledTimes(1);
  });
});
