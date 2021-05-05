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
import LimitedString from './LimitedString';

/** Props passed to the 'AddEntry' component. */
export type AddEntryProps = {
  /** IDs of existing entries. */
  ids: string[];
  /** Adds an entry to the dialog. */
  add: (id: string, entry: Entry) => void;
};

export type EditDialogProps = {
  /** Whether the dialog is open. */
  open: boolean;
  /** The data to display and edit. */
  entries: InitialEntries;
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
  /** Remove sets the value to 0 instead of removing the entry. */
  noRemove?: boolean;
  /** A component that allows adding entries to the dialog. */
  AddEntry?: React.ComponentType<AddEntryProps>;
};

type EditEntryProps = {
  id: string;
  entry: Entry;
  dispatch: React.Dispatch<Actions>;
  strikethroughCleared?: boolean;
  decimalPlaces: number;
  noRemove: boolean;
};

type EntryNumberFormatProps = {
  value?: string;
  disabled?: boolean;
  onValueChange?: (values: NumberFormatValues) => void;
  className?: string;
  decimalPlaces: number;
};

/** An entry to display in the table. */
type InitialEntry = {
  /** A name describing the entry. */
  displayName: string;
  /** `true` if and only if the entry cannot be edited. */
  disabled?: boolean;
  /** A value that is displayed and can be edited if not disabled. */
  initialValue: number;
  /** Optional table cells between the display name and the value. */
  additionalTableCells?:
    | React.ReactElement<TableCellProps>
    | React.ReactElement<TableCellProps>[];
};

/** An entry with an editable value. */
type Entry = InitialEntry & {
  /** The (possibly changed) value. Undefined values are treated as 0. */
  value?: number;
  /** Whether the entry is new. New entries are removed on reset to initial value. */
  new?: boolean;
  /** Whether the entry has been deleted. */
  removed?: boolean;
};

/** Keys mapped to {@link InitialEntry} objects. */
type InitialEntries = { [key: string]: InitialEntry };

/** Keys mapped to {@link Entry} objects. */
type Entries = { [key: string]: Entry };

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
  entries: Entries;
  /** Number of allowed decimal places for user inputs. */
  decimalPlaces: number;
  /** Remove sets the value to 0 instead of removing the entry. */
  noRemove: boolean;
};

const initialState: State = {
  loading: false,
  entries: {},
  decimalPlaces: 6,
  noRemove: false,
};

type InitAction = {
  type: 'init';
  payload: {
    entries: InitialEntries;
    decimalPlaces?: number;
    noRemove?: boolean;
  };
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
type RemoveEntryAction = { type: 'removeEntry'; payload: { id: string } };
type AddEntryAction = {
  type: 'addEntry';
  payload: { id: string; entry: Entry };
};
type ResetEntryAction = {
  type: 'resetEntry';
  payload: { id: string };
};
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
  | RemoveEntryAction
  | AddEntryAction
  | ResetEntryAction
  | SetErrorAction
  | SetLoadingAction;

/**
 * Initializes the state.
 *
 * @param entries - Entries with initial values.
 * @param decimalPlaces - Number of decimal places to use for rounding.
 * @param noRemove - Don't remove entries.
 * @return New {@link State}.
 */
function initAction({
  entries,
  decimalPlaces,
  noRemove,
}: InitAction['payload']): State {
  return {
    ...initialState,
    entries: Object.entries(entries).reduce<Entries>(
      (acc, [k, entry]) => ({
        ...acc,
        [k]: { ...entry, value: entry.initialValue, removed: false },
      }),
      {}
    ),
    decimalPlaces: decimalPlaces || initialState.decimalPlaces,
    noRemove: noRemove || false,
  };
}

/**
 * Sets the value specified by 'id' to 'value'.
 *
 * @param entries - Stored entries.
 * @param decimalPlaces - Number of decimal places to use for rounding.
 * @param id - ID of the entry to modify.
 * @param value - New value of the entry.
 * @return New {@link Entries}.
 */
function setValueAction(
  { entries, decimalPlaces }: State,
  { id, value }: SetValueAction['payload']
): Entries {
  return {
    ...entries,
    [id]: {
      ...entries[id],
      // round to avoid precision errors
      value:
        value !== undefined ? Math.max(round(value, decimalPlaces), 0) : value,
    },
  };
}

/**
 * Decrements the value specified by 'id' by one.
 *
 * @param state - The state.
 * @param id - ID of the entry to decrement.
 * @return New {@link Entries}.
 */
function decrementValueAction(
  state: State,
  { id }: DecrementValueAction['payload']
): Entries {
  return setValueAction(state, {
    id,
    value: (state.entries[id].value || 0) - 1,
  });
}

/**
 * Increments the value specified by 'id' by one.
 *
 * @param state - The state.
 * @param id - ID of the entry to increment.
 * @return New {@link Entries}.
 */
function incrementValueAction(
  state: State,
  { id }: IncrementValueAction['payload']
): Entries {
  return setValueAction(state, {
    id,
    value: (state.entries[id].value || 0) + 1,
  });
}

/**
 * Removes the entry specified by 'id'.
 *
 * @param entries - Stored entries.
 * @param noRemove - Don't remove entries.
 * @param id - ID of the entry to remove.
 * @return New {@link Entries}.
 */
function removeEntryAction(
  { entries, noRemove }: State,
  { id }: RemoveEntryAction['payload']
): Entries {
  return {
    ...entries,
    [id]: {
      ...entries[id],
      value: 0,
      removed: !noRemove && true,
    },
  };
}

/**
 * Adds a new entry.
 *
 * @param entries - Stored entries.
 * @param id - ID of the new entry.
 * @param entry - The new entry.
 * @return New {@link Entries}.
 */
function addEntryAction(
  entries: Entries,
  { id, entry }: AddEntryAction['payload']
): Entries {
  return {
    ...entries,
    [id]: entry,
  };
}

/**
 * Resets an entry. If the entry is new, it is removed. Otherwise, the value is
 * changed to the initial value.
 *
 * @param state - The state.
 * @param id - ID of the entry to reset.
 * @return New {link Entries}.
 */
function resetEntryAction(
  state: State,
  { id }: ResetEntryAction['payload']
): Entries {
  return state.entries[id].new
    ? removeEntryAction(state, { id })
    : setValueAction(state, { id, value: state.entries[id].initialValue });
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'init':
      return initAction(action.payload);
    case 'setValue':
      return {
        ...state,
        entries: setValueAction(state, action.payload),
      };
    case 'decreaseValue':
      return {
        ...state,
        entries: decrementValueAction(state, action.payload),
      };
    case 'increaseValue':
      return {
        ...state,
        entries: incrementValueAction(state, action.payload),
      };
    case 'removeEntry':
      return {
        ...state,
        entries: removeEntryAction(state, action.payload),
      };
    case 'addEntry':
      return {
        ...state,
        entries: addEntryAction(state.entries, action.payload),
      };
    case 'resetEntry':
      return {
        ...state,
        entries: resetEntryAction(state, action.payload),
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
  dispatch,
  strikethroughCleared,
  decimalPlaces,
  noRemove,
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        className={classNames({
          [classes.increase]: entry.value && entry.value > entry.initialValue,
          [classes.decrease]:
            entry.initialValue &&
            (!entry.value || entry.value < entry.initialValue),
          [classes.strikethrough]:
            strikethroughCleared && !entry.value && entry.initialValue,
          [classes.nameCell]: true,
        })}
      >
        <LimitedString value={entry.displayName} />
      </TableCell>
      {entry.additionalTableCells}
      <TableCell className={classes.actionCell}>
        <IconButton
          disabled={entry.disabled || !entry.value}
          onClick={() => dispatch({ type: 'decreaseValue', payload: { id } })}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          variant="outlined"
          className={classes.textField}
          disabled={entry.disabled}
          value={entry.value?.toString()}
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
          disabled={entry.disabled || (noRemove && !entry.value)}
          onClick={() => dispatch({ type: 'removeEntry', payload: { id } })}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          disabled={entry.disabled || entry.value === entry.initialValue}
          onClick={() => dispatch({ type: 'resetEntry', payload: { id } })}
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
  noRemove,
  AddEntry,
}) => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer<Reducer<State, Actions>>(
    reducer,
    initialState
  );

  React.useEffect(() => {
    // reset the dialog on (re-)open or props change
    if (open) {
      dispatch({ type: 'init', payload: { entries, decimalPlaces, noRemove } });
    }
  }, [open, entries, decimalPlaces, noRemove]);

  const { t } = useTranslation();

  const changes = Object.entries(state.entries).reduce(
    (acc, [id, entry]) => ({
      ...acc,
      // only include modified values
      ...(entry.value === entry.initialValue ||
      (entry.value === undefined && entry.initialValue === 0)
        ? {}
        : { [id]: entry.value || 0 }),
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
        {AddEntry && (
          <AddEntry
            ids={Object.entries(state.entries)
              .filter(([, entry]) => !entry.removed)
              .map(([id]) => id)}
            add={(id, entry) => {
              dispatch({ type: 'addEntry', payload: { id, entry } });
            }}
          />
        )}
        {!!Object.entries(state.entries).filter(([, entry]) => !entry.removed)
          .length && (
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
              {Object.entries(state.entries)
                .filter(([, entry]) => !entry.removed)
                .map(([id, entry]) => (
                  <EditEntry
                    key={id}
                    id={id}
                    entry={entry}
                    dispatch={dispatch}
                    strikethroughCleared={strikethroughCleared}
                    decimalPlaces={state.decimalPlaces}
                    noRemove={state.noRemove}
                  />
                ))}
            </TableBody>
          </Table>
        )}
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
