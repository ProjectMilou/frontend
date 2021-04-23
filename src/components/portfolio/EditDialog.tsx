import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputBaseComponentProps,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import React, { Reducer } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ProgressButton from './ProgressButton';
import { errorMessageKey, errorTitleKey } from '../../Errors';
import LimitedLength from './LimitedLength';

export type EditDialogProps = {
  /** Whether the dialog is open. */
  open: boolean;
  /** The data to display and edit. */
  entries: Entries;
  /** Called on dialog close. */
  handleClose: () => void;
  /** Called with the modified values when the action button is clicked. */
  action: (changes: { [key: string]: number }) => Promise<void>;
  /** Strings in the dialog. */
  strings: {
    /** Dialog title. */
    title: string;
    /** Table header text for the display name column. */
    displayNameHeader: string;
    /** Table header text for the value column. */
    valueHeader: string;
    /** Cancel button text. Default: Localized string 'cancel' */
    cancel?: string;
    /** Action button text. Default: Localized string 'portfolio.details.saveChanges' */
    action?: string;
  };
  /** Additional content that is rendered above the table. */
  additionalContent?: React.ReactNode;
  /** Headers for optional table cells between the display name and the value. */
  additionalTableHeadCells?:
    | React.ReactElement<TableCellProps>
    | React.ReactElement<TableCellProps>[];
  /**
   * Whether display names of entries with values that have been set to 0 should
   * be strikethrough. Entries with an initial value of 0 are not affected.
   */
  strikethroughCleared?: boolean;
  /** Number of allowed decimal places for user inputs. Default: 6 */
  decimalPlaces?: number;
};

type EditEntryProps = {
  id: string;
  value?: number;
  entry: Entry;
  dispatch: React.Dispatch<Actions>;
  strikethroughCleared?: boolean;
  decimalPlaces: number;
};

type EntryNumberFormatProps = {
  value?: string;
  disabled?: boolean;
  onValueChange?: (values: NumberFormatValues) => void;
  className?: string;
  decimalPlaces: number;
};

/** An entry with an editable value to display in the table. */
type Entry = {
  /** A name describing the entry. */
  displayName: string;
  /** `true` if and only if the entry cannot be edited. */
  disabled?: boolean;
  /** A value that is displayed and can be edited if not disabled. */
  value: number;
  /** Optional table cells between the display name and the value. */
  additionalTableCells?:
    | React.ReactElement<TableCellProps>
    | React.ReactElement<TableCellProps>[];
};

/** Keys mapped to {@link Entry} objects. */
type Entries = { [key: string]: Entry };

/** Keys mapped to values. Undefined values are treated as 0. */
type Values = { [key: string]: number | undefined };

/**
 * Rounds a floating point number to a specified number of decimal places.
 *
 * @param n - A floating point number.
 * @param d - The number of decimal places.
 * @return - n rounded to d decimal places.
 */
function round(n: number, d: number): number {
  return Math.round(n * 10 ** d) / 10 ** d;
}

type State = {
  /** `true` if and only if waiting for an API response. */
  loading: boolean;
  /** An error that occured during an API call or `undefined`. */
  error?: Error;
  /** All values of an edit dialog. */
  values: Values;
  /** Number of allowed decimal places for user inputs. */
  decimalPlaces: number;
};

const initialState: State = {
  loading: false,
  values: {},
  decimalPlaces: 6,
};

type InitAction = {
  type: 'init';
  payload: { entries: Entries; decimalPlaces?: number };
};
type SetValueAction = {
  type: 'setValue';
  payload: { id: string; value?: number };
};
type DecrementValueAction = {
  type: 'decreaseValue';
  payload: { id: string };
};
type IncrementValueAction = { type: 'increaseValue'; payload: { id: string } };
type ClearValueAction = { type: 'clearValue'; payload: { id: string } };
type SetErrorAction = {
  type: 'setError';
  payload: Error;
};
type SetLoadingAction = {
  type: 'setLoading';
  payload: boolean;
};
type Actions =
  | InitAction
  | SetValueAction
  | DecrementValueAction
  | IncrementValueAction
  | ClearValueAction
  | SetErrorAction
  | SetLoadingAction;

/**
 * Initializes the state.
 *
 * @param entries - Entries with initial values.
 * @param decimalPlaces - Number of decimal places to use for rounding.
 * @return New {@link State}.
 */
function initAction({ entries, decimalPlaces }: InitAction['payload']): State {
  return {
    ...initialState,
    values: entries
      ? Object.entries(entries).reduce<Values>(
          (acc, [k, { value }]) => ({ ...acc, [k]: value }),
          {}
        )
      : {},
    decimalPlaces: decimalPlaces || initialState.decimalPlaces,
  };
}

/**
 * Changes the value specified by 'id' to 'value'.
 *
 * @param values - Stored values.
 * @param decimalPlaces - Number of decimal places to use for rounding.
 * @param id - ID of the entry to modify.
 * @param value - New value of the entry.
 * @return New {@link Values}.
 */
function changeValueAction(
  { values, decimalPlaces }: State,
  { id, value }: SetValueAction['payload']
): Values {
  return {
    ...values,
    // round to avoid precision errors
    [id]:
      value !== undefined ? Math.max(round(value, decimalPlaces), 0) : value,
  };
}

/**
 * Decrements the value specified by 'id' by one.
 *
 * @param state - The state.
 * @param id - ID of the entry to decrement.
 * @return New {@link Values}.
 */
function decrementValueAction(
  state: State,
  { id }: DecrementValueAction['payload']
): Values {
  return changeValueAction(state, { id, value: (state.values[id] || 0) - 1 });
}

/**
 * Increments the value specified by 'id' by one.
 *
 * @param state - The state.
 * @param id - ID of the entry to increment.
 * @return New {@link Values}.
 */
function incrementValueAction(
  state: State,
  { id }: IncrementValueAction['payload']
): Values {
  return changeValueAction(state, { id, value: (state.values[id] || 0) + 1 });
}

/**
 * Sets the value specified by 'id' to 0.
 *
 * @param values - Stored values.
 * @param id - ID of the entry to clear.
 * @return New {@link Values}.
 */
function clearValueAction(
  values: Values,
  { id }: ClearValueAction['payload']
): Values {
  return {
    ...values,
    [id]: 0,
  };
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'init':
      return initAction(action.payload);
    case 'setValue':
      return {
        ...state,
        values: changeValueAction(state, action.payload),
      };
    case 'decreaseValue':
      return {
        ...state,
        values: decrementValueAction(state, action.payload),
      };
    case 'increaseValue':
      return {
        ...state,
        values: incrementValueAction(state, action.payload),
      };
    case 'clearValue':
      return {
        ...state,
        values: clearValueAction(state.values, action.payload),
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error();
  }
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-container': {
      minWidth: '15rem',
    },
    '& .MuiDialog-paper': {
      maxHeight: '40rem',
    },
    '& .MuiTable-root': {
      marginRight: '2rem',
      minWidth: '35rem',
    },
  },
  nameCell: {
    overflowWrap: 'anywhere',
  },
  amountTableCell: {
    paddingLeft: '6rem',
  },
  actionCell: {
    minWidth: '22rem',
  },
  increase: {
    fontWeight: 'bold',
    color: theme.palette.success.main,
  },
  decrease: {
    fontWeight: 'bold',
    color: theme.palette.error.main,
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  textField: {
    maxWidth: '120px',
  },
}));

/**
 * Custom input component that uses react-number-format.
 *
 * On every value change, `onValueChange` is called with the new value.
 *
 * * The value `0` is simply the number 0.
 * * The value `undefined` should also be treated as the number 0.
 *   It is returned when the text input is empty.
 *
 * On blur (e.g. when clicking out of the text input), `onValueChange` is called
 * with `0` if the previous value was `undefined` so that the empty text input is
 * changed to 0.
 *
 * TODO: Use consistent number format across the entire application
 */
const EntryNumberFormat: React.FC<EntryNumberFormatProps> = ({
  value = '',
  disabled,
  className,
  onValueChange,
  decimalPlaces,
}) => {
  /**
   * If the input is a number like '1.0', it should be changed to '1'. Because
   * `value` is converted from {@type number}, '1.0' and '1' result in the same
   * string and the component will not update. This state is a workaround. It is
   * set on blur to force the component to update.
   */
  const [state, setState] = React.useState<boolean>(false);

  return (
    <NumberFormat
      value={value}
      disabled={disabled}
      className={className}
      isNumericString
      allowNegative={false}
      decimalScale={decimalPlaces}
      thousandSeparator=" "
      decimalSeparator=","
      allowedDecimalSeparators={[',', '.']}
      onValueChange={onValueChange}
      onBlur={(e) => {
        // call onValueChange with 0 if empty
        if (onValueChange && !e.currentTarget.value.length) {
          onValueChange({ value: '', formattedValue: '', floatValue: 0 });
        }
        // component update workaround
        setState(!state);
      }}
    />
  );
};

/**
 * A table row that represents an editable entry.
 *
 * The first column contains the entry's display name and is styled depending on
 * its value compared to the initial value. If `strikethroughCleared` is set and
 * the value is `0` or `undefined`, the display name is strikethrough.
 *
 * Optional additional columns are placed between the display name and values.
 *
 * The non-negative value can be modified by a text input or with buttons:
 * * decrement: Decrements the value by 1 (but never below 0).
 * * increment: Increments the value by 1.
 * * clear: Sets the value to 0.
 * * reset: Resets the value to the initial value.
 */
const EditEntry: React.FC<EditEntryProps> = ({
  id,
  entry,
  value,
  dispatch,
  strikethroughCleared,
  decimalPlaces,
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        className={classNames({
          [classes.increase]: value && value > entry.value,
          [classes.decrease]: entry.value && (!value || value < entry.value),
          [classes.strikethrough]:
            strikethroughCleared && !value && entry.value,
          [classes.nameCell]: true,
        })}
      >
        <LimitedLength value={entry.displayName} />
      </TableCell>
      {entry.additionalTableCells}
      <TableCell className={classes.actionCell}>
        <IconButton
          disabled={entry.disabled || !value}
          onClick={() => dispatch({ type: 'decreaseValue', payload: { id } })}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          variant="outlined"
          className={classes.textField}
          disabled={entry.disabled}
          value={value?.toString()}
          InputProps={{
            inputComponent: EntryNumberFormat as React.ElementType<InputBaseComponentProps>,
            inputProps: {
              // react-number-format callback to get the input value as float
              onValueChange: (v: NumberFormatValues) =>
                dispatch({
                  type: 'setValue',
                  payload: { id, value: v.floatValue },
                }),
              decimalPlaces,
            },
          }}
        />
        <IconButton
          disabled={entry.disabled}
          onClick={() => dispatch({ type: 'increaseValue', payload: { id } })}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          disabled={entry.disabled || !value}
          onClick={() => dispatch({ type: 'clearValue', payload: { id } })}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          disabled={entry.disabled || value === entry.value}
          onClick={() =>
            dispatch({
              type: 'setValue',
              payload: { id, value: entry.value },
            })
          }
        >
          <RestoreIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

/**
 * A dialog that displays entries with a number value in a table and allows editing.
 */
const EditDialog: React.FC<EditDialogProps> = ({
  open,
  entries,
  handleClose,
  action,
  strings,
  additionalContent,
  additionalTableHeadCells,
  strikethroughCleared,
  decimalPlaces,
}) => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer<Reducer<State, Actions>>(
    reducer,
    initialState
  );

  React.useEffect(() => {
    // reset the dialog on (re-)open or props change
    if (open) {
      dispatch({ type: 'init', payload: { entries, decimalPlaces } });
    }
  }, [open, entries, decimalPlaces]);

  const { t } = useTranslation();

  const changes = Object.entries(state.values).reduce(
    (acc, [id, value]) => ({
      ...acc,
      // only include modified values
      ...(value === entries[id].value ? {} : { [id]: value }),
    }),
    {}
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      // prevent closing the dialog while loading
      disableBackdropClick={state.loading}
      disableEscapeKeyDown={state.loading}
      className={classes.dialog}
    >
      <DialogTitle>{strings.title}</DialogTitle>
      <DialogContent>
        {additionalContent !== undefined && (
          <DialogContentText>{additionalContent}</DialogContentText>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{strings.displayNameHeader}</TableCell>
              {additionalTableHeadCells}
              <TableCell className={classes.amountTableCell}>
                {strings.valueHeader}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(entries).map(([id, entry]) => (
              <EditEntry
                key={id}
                id={id}
                entry={entry}
                value={state.values[id]}
                dispatch={dispatch}
                strikethroughCleared={strikethroughCleared}
                decimalPlaces={state.decimalPlaces}
              />
            ))}
          </TableBody>
        </Table>
        {state.error && (
          <Typography color="error">
            <b>{t(errorTitleKey(state.error))}</b>:{' '}
            {t(errorMessageKey(state.error))}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={state.loading || !open}
          onClick={() => handleClose()}
          color="primary"
        >
          {strings.cancel || t('cancel')}
        </Button>
        <ProgressButton
          // action button is disabled if all values are unchanged
          disabled={!open || !Object.keys(changes).length}
          loading={state.loading}
          onClick={async () => {
            dispatch({ type: 'setLoading', payload: true });
            try {
              await action(changes);
              handleClose();
            } catch (e) {
              dispatch({ type: 'setLoading', payload: false });
              dispatch({ type: 'setError', payload: e });
            }
          }}
          color="primary"
        >
          {strings.action || t('portfolio.details.saveChanges')}
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
