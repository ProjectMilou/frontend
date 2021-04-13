import { act, fireEvent, render, screen } from '@testing-library/react';
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

  test('should not be able to change textfields', async () => {
    const { findByTestId } = render(<Profile />);

    const email = (await findByTestId('email')) as HTMLInputElement;
    const firstName = (await findByTestId('firstname')) as HTMLInputElement;
    const lastName = (await findByTestId('lastname')) as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'email' } });

    expect(email.value).not.toBe('email');
    expect(firstName).toBeDisabled();
    expect(lastName).toBeDisabled();
  });

  test('delete button opens popup', async () => {
    render(<Profile />);
    const deleteButton = screen.getByText(
      /shell.profile.account-details.delete-account/i
    );
    fireEvent.click(deleteButton);

    expect(screen.getByText(/Ok/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('edit button should change button text and enable textfields', async () => {
    const { findByTestId } = render(<Profile />);
    const edit = screen.getByText(
      /shell.profile.account-details.edit-details/i
    );
    expect(edit).toBeInTheDocument();
    act(() => {
      fireEvent.click(edit);
    });
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
