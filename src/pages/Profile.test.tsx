import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import Profile from './Profile';

describe('Profile', () => {
  test('should render textfields', async () => {
    const { findByTestId } = render(<Profile />);

    const emailInput = await findByTestId('email');
    const firstName = await findByTestId('firstname');
    const lastName = await findByTestId('lastname');

    expect(emailInput).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });

  test('should not be able to change email textfields', async () => {
    const { findByTestId } = render(<Profile />);

    const email = (await findByTestId('email')) as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'email' } });

    expect(email.value).not.toBe('email');
  });

  test('delete button opens popup', async () => {
    render(<Profile />);
    const deleteButton = screen.getByText(
      /shell.profile.account-details.delete-account/i
    );
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Ok/i)).toBeInTheDocument();
      expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });
  });

  test('Update button is present and textfields are enabled', async () => {
    const { findByTestId } = render(<Profile />);
    const update = screen.getByText(
      /shell.profile.account-details.update-details/i
    );
    expect(update).toBeInTheDocument();

    const firstName = (await findByTestId('firstname')) as HTMLInputElement;
    const lastName = (await findByTestId('lastname')) as HTMLInputElement;
    expect(firstName).not.toBeDisabled();
    expect(lastName).not.toBeDisabled();
  });
});
