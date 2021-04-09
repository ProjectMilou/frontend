import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import RenameDialog, { RenameDialogProps } from './RenameDialog';
import { AppError } from '../../Errors';

describe('RenameDialog', () => {
  const defaultProps: RenameDialogProps = {
    initialName: 'name',
    open: true,
    rename: jest.fn(),
    handleClose: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<RenameDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<RenameDialog {...props} />),
      props,
    };
  };

  test('render the dialog', () => {
    renderComponent();
    expect(screen.getAllByText('portfolio.name')[0]).toBeInTheDocument();
    expect(screen.getByText('portfolio.rename')).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.rename.text')
    ).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.rename.title')
    ).toBeInTheDocument();
  });

  test('call handleClose when clicking cancel', () => {
    const { props } = renderComponent();
    fireEvent.click(screen.getByText('cancel'));
    expect(props.handleClose).toHaveBeenCalled();
  });

  test('validate invalid name', () => {
    renderComponent();
    expect(
      screen.getByText('portfolio.rename').closest('button')
    ).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: '' },
    });
    expect(
      screen.getByText('portfolio.rename').closest('button')
    ).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('validate valid name', () => {
    renderComponent();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    expect(
      screen.getByText('portfolio.rename').closest('button')
    ).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('close the dialog after rename', async () => {
    const { props } = renderComponent({
      rename: jest.fn().mockResolvedValue(undefined),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.rename'));
    expect(props.rename).toHaveBeenCalledWith('input');
    // wait for the update
    await waitFor(() => {
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('reset state on reopen', async () => {
    const { props, rerender } = renderComponent({
      rename: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.rename'));
    // wait for the error
    await waitFor(() => {
      expect(screen.getByText('error.message.UNKNOWN')).toBeInTheDocument();
    });
    rerender(<RenameDialog {...props} open={false} initialName="otherName" />);
    rerender(<RenameDialog {...props} open initialName="otherName" />);
    expect(screen.queryByText('error.message.UNKNOWN')).not.toBeInTheDocument();
    expect(screen.queryByText('input')).not.toBeInTheDocument();
    expect(screen.queryByText('name')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/otherName/)).toBeInTheDocument();
    });
  });
});
