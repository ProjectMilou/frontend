import React from 'react';
import { render, screen } from '@testing-library/react';
import ValueOverName from './ValueOverName';

const testValue = '15%';
const testName = 'Total Return';
const testValueColor = '#ffff00';

test('ValueOverName renders correctly', () => {
  render(
    <ValueOverName
      value={testValue}
      name={testName}
      valueColor={testValueColor}
    />
  );

  screen.getByText(testName);
  const renderedValue = screen.getByText(testValue);
  expect(renderedValue).toHaveAttribute('style', 'color: rgb(255, 255, 0);');
});
