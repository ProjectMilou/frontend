import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import DuplicateDialog, { DuplicateDialogProps } from './DuplicateDialog';
import { AppError } from '../../Errors';

describe('DuplicateDialog', () => {
  const defaultProps: DuplicateDialogProps = {
    initialName: 'name',
    open: true,
    duplicate: jest.fn(),
    handleClose: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DuplicateDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DuplicateDialog {...props} />),
      props,
    };
  };

  test('render the dialog', () => {
    renderComponent();
    expect(screen.getAllByText('portfolio.name')[0]).toBeInTheDocument();
    expect(screen.getByText('portfolio.duplicate')).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.duplicate.text')
    ).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.duplicate.title')
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
      screen.getByText('portfolio.duplicate').closest('button')
    ).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: '' },
    });
    expect(
      screen.getByText('portfolio.duplicate').closest('button')
    ).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('validate valid name', () => {
    renderComponent();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    expect(
      screen.getByText('portfolio.duplicate').closest('button')
    ).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('close the dialog after duplicate', async () => {
    const { props } = renderComponent({
      duplicate: jest.fn().mockResolvedValue(undefined),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.duplicate'));
    expect(props.duplicate).toHaveBeenCalledWith('input');
    // wait for the update
    await waitFor(() => {
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('reset state on reopen', async () => {
    const { props, rerender } = renderComponent({
      duplicate: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.duplicate'));
    // wait for the error
    await waitFor(() => {
      expect(screen.getByText('error.message.UNKNOWN')).toBeInTheDocument();
    });
    rerender(
      <DuplicateDialog {...props} open={false} initialName="otherName" />
    );
    rerender(<DuplicateDialog {...props} open initialName="otherName" />);
    expect(screen.queryByText('error.message.UNKNOWN')).not.toBeInTheDocument();
    expect(screen.queryByText('input')).not.toBeInTheDocument();
    expect(screen.queryByText('name')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/otherName/)).toBeInTheDocument();
    });
  });
});
