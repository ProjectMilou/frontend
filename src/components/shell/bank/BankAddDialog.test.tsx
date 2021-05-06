import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import BankAddDialog from './BankAddDialog';

describe('BankAddDialog', () => {

  const linkProp = "https://www.example.com"

  test('should match snapshot', () => {
    const { container } = render(<BankAddDialog link={linkProp}/>);
    expect( container ).toMatchSnapshot();
  });

  test('should open link', async () => {
    const {getByRole} = render(<BankAddDialog link={linkProp}/>);
    const link = getByRole("link")
    expect(link).toBeInTheDocument()
    global.open = jest.fn();
    fireEvent.click(link);
    waitFor(() => {
      expect(global.open).toBeCalled();
    }).then(() => {})
  });
});