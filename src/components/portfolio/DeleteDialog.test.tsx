import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import DeleteDialog, { DeleteDialogProps } from './DeleteDialog';
import { AppError } from '../../Errors';

describe('DeleteDialog', () => {
  const defaultProps: DeleteDialogProps = {
    initialName: 'name',
    open: true,
    deletePortfolio: jest.fn(),
    handleClose: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DeleteDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DeleteDialog {...props} />),
      props,
    };
  };

  test('render the dialog', () => {
    renderComponent();
    expect(screen.getByText('portfolio.delete')).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.delete.text')
    ).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.delete.title')
    ).toBeInTheDocument();
  });

  test('call handleClose when clicking cancel', () => {
    const { props } = renderComponent();
    fireEvent.click(screen.getByText('cancel'));
    expect(props.handleClose).toHaveBeenCalled();
  });

  test('close the dialog after delete', async () => {
    const { props } = renderComponent({
      deletePortfolio: jest.fn().mockResolvedValue(undefined),
    });
    fireEvent.click(screen.getByText('portfolio.delete'));
    expect(props.deletePortfolio).toHaveBeenCalled();
    // wait for the update
    await waitFor(() => {
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('reset state on reopen', async () => {
    const { props, rerender } = renderComponent({
      deletePortfolio: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.click(screen.getByText('portfolio.delete'));
    // wait for the error
    await waitFor(() => {
      expect(screen.getByText(/error\.message\.UNKNOWN/)).toBeInTheDocument();
    });
    rerender(<DeleteDialog {...props} open={false} initialName="otherName" />);
    rerender(<DeleteDialog {...props} open initialName="otherName" />);
    expect(screen.queryByText('error.message.UNKNOWN')).not.toBeInTheDocument();
    expect(screen.queryByText('name')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/otherName/)).toBeInTheDocument();
    });
  });
});
