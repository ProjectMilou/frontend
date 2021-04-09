import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import CreateDialog, { CreateDialogProps } from './CreateDialog';
import { AppError } from '../../Errors';

describe('CreateDialog', () => {
  const defaultProps: CreateDialogProps = {
    open: true,
    create: jest.fn(),
    handleClose: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<CreateDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<CreateDialog {...props} />),
      props,
    };
  };

  test('render the dialog', () => {
    renderComponent();
    expect(screen.getAllByText('portfolio.name')[0]).toBeInTheDocument();
    expect(screen.getByText('portfolio.create')).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.create.text')
    ).toBeInTheDocument();
    expect(
      screen.getByText('portfolio.dialog.create.title')
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
      screen.getByText('portfolio.create').closest('button')
    ).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: ' ' },
    });
    expect(
      screen.getByText('portfolio.create').closest('button')
    ).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('validate valid name', () => {
    renderComponent();
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    expect(
      screen.getByText('portfolio.create').closest('button')
    ).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('close the dialog after create', async () => {
    const { props } = renderComponent({
      create: jest.fn().mockResolvedValue(undefined),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.create'));
    expect(props.create).toHaveBeenCalledWith('input');
    // wait for the update
    await waitFor(() => {
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('reset state on reopen', async () => {
    const { props, rerender } = renderComponent({
      create: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText('portfolio.create'));
    // wait for the error
    await waitFor(() => {
      expect(screen.getByText('error.message.UNKNOWN')).toBeInTheDocument();
    });
    rerender(<CreateDialog {...props} open={false} />);
    rerender(<CreateDialog {...props} open />);
    expect(screen.queryByText('error.message.UNKNOWN')).not.toBeInTheDocument();
    expect(screen.queryByText('input')).not.toBeInTheDocument();
  });
});
