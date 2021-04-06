import React, { Reducer } from 'react';
import { RouteComponentProps } from '@reach/router';
import { LinearProgress, makeStyles, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../portfolio/APIClient';
import ErrorMessage from '../shared/ErrorMessage';
import PortfolioOverview from './PortfolioOverview';
import DashboardHeader from '../shared/DashboardHeader';
import RenameDialog from './RenameDialog';
import DuplicateDialog from './DuplicateDialog';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import { isAuthenticationError } from '../../Errors';

export interface DashboardProps extends RouteComponentProps {
  token: string;
  selectPortfolio: (id: string) => void;
};

enum DialogType {
  None,
  CreatePortfolio,
  RenamePortfolio,
  DuplicatePortfolio,
  DeletePortfolio,
}

type Dialog = {
  type: DialogType;
  portfolioId?: string;
};

function portfolioName(
  portfolios?: API.PortfolioOverview[],
  id?: string
): string | undefined {
  return portfolios && id
    ? portfolios.find((p) => p.id === id)?.name
    : undefined;
}

/* A reducer is used to manage this component's state (portfolios, errors, open
 * dialog). The state should only be modified by dispatch calls, never directly.
 * Actions are not async, so API calls are made before dispatching.
 */

type State = {
  portfolios?: API.PortfolioOverview[];
  error?: Error;
  dialog: Dialog;
};

const initialState = { dialog: { type: DialogType.None } };

type SetPortfoliosAction = {
  type: 'setPortfolios';
  payload: API.PortfolioOverview[];
};
type CreateAction = {
  type: 'create';
  payload: { id: string; name: string };
};
type RenameAction = {
  type: 'rename';
  payload: { id: string; name: string };
};
type DuplicateAction = {
  type: 'duplicate';
  payload: { id: string; newId: string; newName: string };
};
type DeleteAction = {
  type: 'delete';
  payload: { id: string };
};
type SetErrorAction = {
  type: 'setError';
  payload: Error;
};
type ClearErrorAction = {
  type: 'clearError';
};
type OpenDialogAction = {
  type: 'openDialog';
  payload: Dialog;
};
type CloseDialogAction = {
  type: 'closeDialog';
};
type Actions =
  | SetPortfoliosAction
  | CreateAction
  | RenameAction
  | DuplicateAction
  | DeleteAction
  | SetErrorAction
  | ClearErrorAction
  | OpenDialogAction
  | CloseDialogAction;

function createPortfolioAction(
  portfolios: API.PortfolioOverview[] | undefined,
  { id, name }: CreateAction['payload']
) {
  return (
    portfolios && [
      ...portfolios,
      {
        id,
        name,
        virtual: true,
        positionCount: 0,
        value: 0,
        perf7d: 0,
        perf1y: 0,
        modified: new Date(),
      },
    ]
  );
}

function renamePortfolioAction(
  portfolios: API.PortfolioOverview[] | undefined,
  { id, name }: RenameAction['payload']
) {
  return (
    portfolios &&
    portfolios.map((p) => ({
      ...p,
      name: p.id === id ? name : p.name,
    }))
  );
}

function duplicatePortfolioAction(
  portfolios: API.PortfolioOverview[] | undefined,
  { id, newId, newName }: DuplicateAction['payload']
) {
  return (
    portfolios && [
      ...portfolios,
      {
        ...(portfolios.find((p) => p.id === id) as API.PortfolioOverview),
        id: newId,
        name: newName,
        virtual: true,
      },
    ]
  );
}

function deletePortfolioAction(
  portfolios: API.PortfolioOverview[] | undefined,
  { id }: DeleteAction['payload']
) {
  return portfolios && portfolios.filter((p) => p.id !== id);
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'setPortfolios':
      return {
        ...state,
        portfolios: action.payload,
      };
    case 'create':
      return {
        ...state,
        portfolios: createPortfolioAction(state.portfolios, action.payload),
      };
    case 'rename':
      return {
        ...state,
        portfolios: renamePortfolioAction(state.portfolios, action.payload),
      };
    case 'duplicate':
      return {
        ...state,
        portfolios: duplicatePortfolioAction(state.portfolios, action.payload),
      };
    case 'delete':
      return {
        ...state,
        portfolios: deletePortfolioAction(state.portfolios, action.payload),
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'clearError':
      return {
        ...state,
        error: undefined,
      };
    case 'openDialog':
      return {
        ...state,
        dialog: action.payload,
      };
    case 'closeDialog':
      return {
        ...state,
        dialog: initialState.dialog,
      };
    default:
      throw new Error();
  }
}

const useStyles = makeStyles({
  dashboard: {
    margin: '25px auto',
  },
});

const Dashboard: React.FC<DashboardProps> = ({ token, selectPortfolio }) => {
  const [state, dispatch] = React.useReducer<Reducer<State, Actions>>(
    reducer,
    initialState
  );

  const isMounted = React.useRef(true);
  const fetch = async () => {
    dispatch({ type: 'clearError' });
    try {
      const p = await API.list(token);
      if (isMounted.current) {
        dispatch({ type: 'setPortfolios', payload: p });
      }
    } catch (e) {
      if (isMounted.current) {
        dispatch({ type: 'setError', payload: e });
      }
    }
  };

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <DashboardHeader>{t('portfolio.dashboard.headerText')}</DashboardHeader>
      {!state.portfolios && !state.error && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      <Container maxWidth="lg" className={classes.dashboard}>
        {state.error && (
          <ErrorMessage
            error={state.error}
            messageKey="portfolio.dashboard.errorMessage"
            handling={
              isAuthenticationError(state.error)
                ? {
                  buttonText: 'error.action.login',
                  action: async () => {
                    // TODO: go back to login
                  },
                }
                : {
                  buttonText: 'error.action.retry',
                  action: fetch,
                }
            }
          />
        )}
        {state.portfolios && (
          <div>
            <PortfolioOverview
              portfolios={state.portfolios}
              selectPortfolio={selectPortfolio}
              renamePortfolio={(portfolioId) =>
                dispatch({
                  type: 'openDialog',
                  payload: { type: DialogType.RenamePortfolio, portfolioId },
                })
              }
              duplicatePortfolio={(portfolioId) =>
                dispatch({
                  type: 'openDialog',
                  payload: { type: DialogType.DuplicatePortfolio, portfolioId },
                })
              }
              deletePortfolio={(portfolioId) => {
                dispatch({
                  type: 'openDialog',
                  payload: { type: DialogType.DeletePortfolio, portfolioId },
                });
              }}
              createPortfolio={() => {
                dispatch({
                  type: 'openDialog',
                  payload: { type: DialogType.CreatePortfolio },
                });
              }}
            />
          </div>
        )}
      </Container>
      <CreateDialog
        open={state.dialog.type === DialogType.CreatePortfolio}
        handleClose={() => dispatch({ type: 'closeDialog' })}
        create={async (name) => {
          const id = await API.create(token, name);
          dispatch({ type: 'create', payload: { id, name } });
        }}
      />
      <RenameDialog
        initialName={portfolioName(state.portfolios, state.dialog.portfolioId)}
        open={state.dialog.type === DialogType.RenamePortfolio}
        handleClose={() => dispatch({ type: 'closeDialog' })}
        rename={async (name) => {
          if (state.dialog.portfolioId) {
            await API.rename(token, state.dialog.portfolioId, name);
            dispatch({
              type: 'rename',
              payload: { id: state.dialog.portfolioId, name },
            });
          }
        }}
      />
      <DuplicateDialog
        initialName={portfolioName(state.portfolios, state.dialog.portfolioId)}
        open={state.dialog.type === DialogType.DuplicatePortfolio}
        handleClose={() => dispatch({ type: 'closeDialog' })}
        duplicate={async (name) => {
          if (state.dialog.portfolioId) {
            const id = await API.duplicate(
              token,
              state.dialog.portfolioId,
              name
            );
            dispatch({
              type: 'duplicate',
              payload: {
                id: state.dialog.portfolioId,
                newId: id,
                newName: name,
              },
            });
          }
        }}
      />
      <DeleteDialog
        initialName={portfolioName(state.portfolios, state.dialog.portfolioId)}
        open={state.dialog.type === DialogType.DeletePortfolio}
        handleClose={() => dispatch({ type: 'closeDialog' })}
        deletePortfolio={async () => {
          if (state.dialog.portfolioId) {
            await API.deletePortfolio(token, state.dialog.portfolioId);
            dispatch({
              type: 'delete',
              payload: { id: state.dialog.portfolioId },
            });
          }
        }}
      />
    </>
  );
};

export default Dashboard;
