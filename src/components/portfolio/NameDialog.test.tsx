import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import NameDialog, { NameDialogProps } from './NameDialog';
import { AppError } from '../../Errors';

describe('NameDialog', () => {
  const defaultProps: NameDialogProps = {
    initialName: 'name',
    actionKey: 'Action',
    dialogText: 'Dialog text',
    dialogTitle: 'Dialog title',
    labelKey: 'Textbox label',
    open: true,
    handleClose: jest.fn(),
    action: jest.fn(),
    validate: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<NameDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<NameDialog {...props} />),
      props,
    };
  };

  test('render the dialog', () => {
    const { props } = renderComponent();
    expect(screen.getAllByText(props.labelKey)[0]).toBeInTheDocument();
    expect(screen.getByText(props.actionKey)).toBeInTheDocument();
    expect(screen.getByText('Dialog text')).toBeInTheDocument();
    expect(screen.getByText('Dialog title')).toBeInTheDocument();
  });

  test('call handleClose when clicking cancel', () => {
    const { props } = renderComponent();
    fireEvent.click(screen.getByText('cancel'));
    expect(props.handleClose).toHaveBeenCalled();
  });

  test('validate invalid user input', () => {
    const { props } = renderComponent({
      validate: jest.fn().mockReturnValue(false),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    expect(props.validate).toHaveBeenCalledWith('input');
    expect(screen.getByText(props.actionKey).closest('button')).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('validate valid user input', () => {
    const { props } = renderComponent({
      validate: jest.fn().mockReturnValue(true),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    expect(props.validate).toHaveBeenCalledWith('input');
    expect(screen.getByText(props.actionKey).closest('button')).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
  });

  test('prevent closing the dialog while waiting', () => {
    const { props } = renderComponent({
      validate: jest.fn().mockReturnValue(true),
      // never resolve
      action: jest.fn().mockImplementation(() => new Promise(() => {})),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText(props.actionKey));
    expect(props.action).toHaveBeenCalledWith('input');
    expect(screen.getByText(props.actionKey).closest('button')).toBeDisabled();
    expect(screen.getByText('cancel').closest('button')).toBeDisabled();
  });

  test('show error', async () => {
    const { props } = renderComponent({
      validate: jest.fn().mockReturnValue(true),
      action: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText(props.actionKey));
    // wait for the update
    expect(props.action).toHaveBeenCalledWith('input');
    await waitFor(() => {
      expect(screen.getByText('error.message.UNKNOWN')).toBeInTheDocument();
    });
    expect(screen.getByText(props.actionKey).closest('button')).toBeEnabled();
    expect(screen.getByText('cancel').closest('button')).toBeEnabled();
    expect(props.handleClose).not.toHaveBeenCalled();
  });

  test('close the dialog after invoking the action', async () => {
    const { props } = renderComponent({
      validate: jest.fn().mockReturnValue(true),
      action: jest.fn().mockResolvedValue(undefined),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText(props.actionKey));
    expect(props.action).toHaveBeenCalledWith('input');
    // wait for the update
    await waitFor(() => {
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('reset state on reopen', async () => {
    const { props, rerender } = renderComponent({
      validate: jest.fn().mockReturnValue(true),
      action: jest.fn().mockRejectedValue(new AppError('UNKNOWN')),
    });
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'input' },
    });
    fireEvent.click(screen.getByText(props.actionKey));
    // wait for the error
    await waitFor(() => {
      expect(screen.getByText('error.message.UNKNOWN')).toBeInTheDocument();
    });
    rerender(<NameDialog {...props} open={false} />);
    rerender(<NameDialog {...props} open />);
    expect(screen.queryByText('error.message.UNKNOWN')).not.toBeInTheDocument();
    expect(screen.queryByText('input')).not.toBeInTheDocument();
  });
});
