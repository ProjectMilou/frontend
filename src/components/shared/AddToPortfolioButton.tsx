import React, { Reducer } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Alert } from '@material-ui/lab';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Snackbar } from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import { errorMessageKey, errorTitleKey } from '../../Errors';
import EditDialog from '../portfolio/EditDialog';

// stylesheet for the entire add to portfolio component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      '& > *': {
        margin: theme.spacing(1),
      },
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
      color: 'primary',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

type AddToPortfolioButtonProps = {
  symbol: string;
  token: string;
};

type SnackbarName = 'error' | 'noPortfolios';

type State = {
  /** Information about the stock quantity in the user's portfolios. */
  portfolios?: API.PortfolioStock[];
  /** Whether the dialog is currently open. */
  open: boolean;
  /** Whether `portfolios` is currently being fetched. */
  loading: boolean;
  /** The most recent error that occurred when fetching `portfolios`. */
  error?: Error;
  /** Which snackbars are currently open. */
  snackbars: {
    [key in SnackbarName]: boolean;
  };
};

const initialState: State = {
  open: false,
  loading: false,
  snackbars: {
    error: false,
    noPortfolios: false,
  },
};

type InitAction = { type: 'init' };
type SetPortfoliosAction = {
  type: 'setPortfolios';
  payload: API.PortfolioStock[];
};
type SetOpenAction = { type: 'setOpen'; payload: boolean };
type SetLoadingAction = { type: 'setLoading'; payload: boolean };
type SetErrorAction = { type: 'setError'; payload: Error };
type OpenSnackbarAction = { type: 'openSnackbar'; payload: SnackbarName };
type CloseSnackbarAction = { type: 'closeSnackbar'; payload: SnackbarName };
type Actions =
  | InitAction
  | SetPortfoliosAction
  | SetOpenAction
  | SetLoadingAction
  | SetErrorAction
  | OpenSnackbarAction
  | CloseSnackbarAction;

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'setPortfolios':
      return {
        ...state,
        portfolios: action.payload,
      };
    case 'setOpen':
      return {
        ...state,
        open: action.payload,
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'openSnackbar':
      return {
        ...state,
        snackbars: {
          ...state.snackbars,
          [action.payload]: true,
        },
      };
    case 'closeSnackbar':
      return {
        ...state,
        snackbars: {
          ...state.snackbars,
          [action.payload]: false,
        },
      };
    default:
      throw new Error();
  }
}

// returns the add to portfolio button and all subcomponents including the dialog window
const AddToPortfolioButton: React.FC<AddToPortfolioButtonProps> = ({
  symbol,
  token,
}) => {
  // style and translation hooks
  const classes = useStyles();
  const { t } = useTranslation();

  const [state, dispatch] = React.useReducer<Reducer<State, Actions>>(
    reducer,
    initialState
  );

  // reset state on stock change
  React.useEffect(() => dispatch({ type: 'init' }), [symbol]);

  const isMounted = React.useRef(true);
  React.useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const openDialog = async () => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      // const p = await API.stock(token, symbol);
      const p: API.PortfolioStock[] = [
        { id: 'MOCK', qty: 2.5, virtual: true, name: 'mock portfolio' },
      ];
      // const p: API.PortfolioStock[] = [];
      if (isMounted.current) {
        dispatch({ type: 'setPortfolios', payload: p });
        if (p.length) {
          dispatch({ type: 'setOpen', payload: true });
        } else {
          // openDialog is called on button click which can trigger a close event of an open snackbar that could be handled
          // after openDialog, so the (re-)opening of the snackbar is delayed to avoid close being handled after open.
          process.nextTick(() =>
            dispatch({ type: 'openSnackbar', payload: 'noPortfolios' })
          );
        }
      }
    } catch (e) {
      if (isMounted.current) {
        dispatch({ type: 'setError', payload: e });
        process.nextTick(() =>
          dispatch({ type: 'openSnackbar', payload: 'error' })
        );
      }
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  return (
    <div className={classes.root}>
      {/* Loading will be implemeted here in future */}
      <Fab
        className={classes.addButton}
        onClick={() => openDialog()}
        color="primary"
        aria-label="add"
        variant="extended"
      >
        <AddIcon />
        <>&nbsp;&nbsp;</>
        {t('analyzer.addToPortfolio')}
      </Fab>
      {state.error && (
        // TODO: Handle errors consistently (also use Snackbar for errors in dialogs)
        <Snackbar
          open={state.snackbars.error}
          onClose={() => dispatch({ type: 'closeSnackbar', payload: 'error' })}
        >
          <Alert
            onClose={() =>
              dispatch({ type: 'closeSnackbar', payload: 'error' })
            }
            severity="error"
          >
            <b>{t(errorTitleKey(state.error))}</b>:{' '}
            {t(errorMessageKey(state.error))}
          </Alert>
        </Snackbar>
      )}
      <Snackbar
        open={state.snackbars.noPortfolios}
        onClose={() =>
          dispatch({ type: 'closeSnackbar', payload: 'noPortfolios' })
        }
      >
        <Alert
          onClose={() =>
            dispatch({ type: 'closeSnackbar', payload: 'noPortfolios' })
          }
          severity="info"
        >
          {t('analyzer.addToPortfolio.noPortfolios')}
        </Alert>
      </Snackbar>
      {state.portfolios && (
        <EditDialog
          open={state.open}
          strings={{
            title: t('portfolio.dialog.addStock.title'),
            displayNameHeader: t('portfolio'),
            valueHeader: t('portfolio.details.amount'),
          }}
          additionalContent={t('portfolio.dialog.addStock.text')}
          entries={state.portfolios.reduce(
            (acc, p) => ({
              ...acc,
              [p.id]: {
                displayName: p.name,
                disabled: !p.virtual,
                value: p.qty,
              },
            }),
            {}
          )}
          handleClose={() => dispatch({ type: 'setOpen', payload: false })}
          action={async (v) => {
            await API.saveStockToPortfolios(
              token,
              symbol,
              Object.entries(v).map(([id, qty]) => ({ id, qty }))
            );
          }}
        />
      )}
    </div>
  );
};

// exports
export default AddToPortfolioButton;
