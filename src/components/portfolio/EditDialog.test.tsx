import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import { TableCell } from '@material-ui/core';
import EditDialog, { EditDialogProps } from './EditDialog';
import { AppError } from '../../Errors';

describe('EditDialog', () => {
  const defaultProps: EditDialogProps = {
    entries: {
      entry: { displayName: 'entry', initialValue: 3 },
      disabled: { displayName: 'disabled', initialValue: 1, disabled: true },
    },
    handleClose: jest.fn(),
    action: jest.fn(),
    open: true,
    strings: {
      title: 'title',
      displayNameHeader: 'displayNameHeader',
      valueHeader: 'valueHeader',
      action: 'action',
      cancel: 'cancel',
    },
  };

  const renderComponent = (newProps?: Partial<EditDialogProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<EditDialog {...props} />),
      props,
    };
  };

  test('renders the dialog', () => {
    const { props } = renderComponent();
    expect(screen.getByText(props.strings.title)).toBeInTheDocument();
    expect(
      screen.getByText(props.strings.displayNameHeader)
    ).toBeInTheDocument();
    expect(screen.getByText(props.strings.valueHeader)).toBeInTheDocument();
    expect(screen.getByText(props.strings.action!)).toBeInTheDocument();
    expect(screen.getByText(props.strings.cancel!)).toBeInTheDocument();
    expect(
      screen.getByText(props.entries.entry.displayName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(props.entries.disabled.displayName)
    ).toBeInTheDocument();
  });

  test('renders additional content', () => {
    renderComponent({
      additionalContent: 'additional content',
      additionalTableHeadCells: <TableCell>header cell</TableCell>,
      entries: {
        entry: {
          displayName: 'entry',
          initialValue: 3,
          additionalTableCells: <TableCell>content cell</TableCell>,
        },
      },
    });
    expect(screen.getByText('additional content')).toBeInTheDocument();
    expect(screen.getByText('header cell')).toBeInTheDocument();
    expect(screen.getByText('content cell')).toBeInTheDocument();
  });

  test('does not render header of empty table', () => {
    const { props } = renderComponent({ entries: {} });
    expect(screen.queryByText(props.strings.displayNameHeader)).toBeNull();
    expect(screen.queryByText(props.strings.valueHeader)).toBeNull();
  });

  test('discards changes on cancel', () => {
    const { props } = renderComponent();
    const input = document.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(screen.getByText(props.strings.cancel!));
    expect(props.handleClose).toHaveBeenCalled();
    expect(props.action).not.toHaveBeenCalled();
  });

  test('invokes action on save', async () => {
    const { props } = renderComponent();
    const input = document.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 42 } });
    fireEvent.click(screen.getByText(props.strings.action!));
    await waitFor(() => {
      expect(props.action).toHaveBeenCalledWith({ entry: 42 });
      expect(props.handleClose).toHaveBeenCalled();
    });
  });

  test('sets value to 0 for empty input', () => {
    renderComponent();
    const input = document.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(input.value).toEqual('0');
  });

  test('decreases value by 1', () => {
    const { props } = renderComponent();
    const input = document.querySelectorAll('input')[0];
    const decrease = document.querySelectorAll('button')[0];
    fireEvent.click(decrease);
    expect(input.value).toEqual(
      (props.entries.entry.initialValue - 1).toString()
    );
  });

  test('increases value by 1', () => {
    const { props } = renderComponent();
    const input = document.querySelectorAll('input')[0];
    const increase = document.querySelectorAll('button')[1];
    fireEvent.click(increase);
    expect(input.value).toEqual(
      (props.entries.entry.initialValue + 1).toString()
    );
  });

  test('removes entry', () => {
    const { props } = renderComponent();
    const remove = document.querySelectorAll('button')[2];
    fireEvent.click(remove);
    expect(screen.queryByText(props.entries.entry.displayName)).toBeNull();
    fireEvent.click(screen.getByText(props.strings.action!));
    expect(props.action).toHaveBeenCalledWith({ entry: 0 });
  });

  test('resets entry to initial value', () => {
    const { props } = renderComponent();
    const input = document.querySelectorAll('input')[0];
    const reset = document.querySelectorAll('button')[3];
    expect(reset).toBeDisabled();
    fireEvent.change(input, { target: { value: 42 } });
    expect(reset).toBeEnabled();
    fireEvent.click(reset);
    expect(input.value).toEqual(props.entries.entry.initialValue.toString());
    expect(reset).toBeDisabled();
  });

  test('displays error message', async () => {
    const { props } = renderComponent();
    (props.action as jest.Mock).mockRejectedValue(new AppError('QTY_INVALID'));
    const input = document.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { value: 42 } });
    fireEvent.click(screen.getByText(props.strings.action!));
    expect(
      await screen.findByText(/error\.title\.QTY_INVALID/)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/error\.message\.QTY_INVALID/)
    ).toBeInTheDocument();
  });
});
