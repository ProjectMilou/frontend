import { render } from '@testing-library/react';
import * as React from 'react';
import PasswordRequirement, {
  PasswordRequirementProps,
} from './PasswordRequirement';

describe('PasswordRequirement', () => {
  const renderPasswordRequirement = (props: PasswordRequirementProps) =>
    render(<PasswordRequirement {...props} />);

  test('should render valid requirement', async () => {
    const component = renderPasswordRequirement({ done: true, text: 'text' });
    expect(component).toMatchSnapshot();
  });
  test('should render invalid requirement', async () => {
    const component = renderPasswordRequirement({ done: false, text: 'text' });
    expect(component).toMatchSnapshot();
  });
});
