import React from 'react';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import { errorMessageKey, errorTitleKey } from '../../Errors';
import ProgressButton from '../portfolio/ProgressButton';
import EditDialog from '../portfolio/EditDialog';

// stylesheet for the entire add to portfolio component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      padding: '0.25rem 1rem',
      backgroundColor: theme.palette.lightBlue.main,
      '&:hover': {
        backgroundColor: lighten(theme.palette.lightBlue.main, 0.35),
      },
      whiteSpace: 'nowrap',
    },
  })
);

type AddToPortfolioButtonProps = {
  symbol: string;
  token: string;
};

// returns the add to portfolio button and all subcomponents including the dialog window
const AddToPortfolioButton: React.FC<AddToPortfolioButtonProps> = ({
  symbol,
  token,
}) => {
  // style and translation hooks
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: refactor state handling

  // the list of portfolios belonging to the user
  const [portfolios, setPortfolios] = React.useState<
    API.PortfolioStock[] | undefined
  >(undefined);

  // the state that controls whether the dialog window is open or closed
  const [open, setOpen] = React.useState<boolean>(false);
  // true when waiting for an API response
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState<boolean>(
    false
  );
  const [
    noPortfoliosSnackbarOpen,
    setNoPortfoliosSnackbarOpen,
  ] = React.useState<boolean>(false);

  const isMounted = React.useRef(true);
  const openDialog = async () => {
    setLoading(true);
    try {
      // const p = await API.stock(token, symbol);
      const p: API.PortfolioStock[] = [
        { id: 'MOCK', qty: 2.5, virtual: true, name: 'mock portfolio' },
      ];
      // const p: API.PortfolioStock[] = [];
      if (isMounted.current) {
        setPortfolios(p);
        if (p.length) {
          setOpen(true);
        } else {
          // openDialog is called on button click which can trigger a close event of an open snackbar that could be handled
          // after openDialog, so the (re-)opening of the snackbar is delayed to avoid close being handled after open.
          process.nextTick(() => setNoPortfoliosSnackbarOpen(true));
        }
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
        process.nextTick(() => setErrorSnackbarOpen(true));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProgressButton
        className={classes.addButton}
        onClick={() => openDialog()}
        loading={loading}
      >
        {t('analyzer.addToPortfolio')}
      </ProgressButton>
      {error && (
        // TODO: Handle errors consistently (also use Snackbar for errors in dialogs)
        <Snackbar
          open={errorSnackbarOpen}
          onClose={() => setErrorSnackbarOpen(false)}
        >
          <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error">
            <b>{t(errorTitleKey(error))}</b>: {t(errorMessageKey(error))}
          </Alert>
        </Snackbar>
      )}
      <Snackbar
        open={noPortfoliosSnackbarOpen}
        onClose={() => setNoPortfoliosSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setNoPortfoliosSnackbarOpen(false)}
          severity="info"
        >
          {t('analyzer.addToPortfolio.noPortfolios')}
        </Alert>
      </Snackbar>
      {portfolios && (
        <EditDialog
          open={open}
          strings={{
            title: t('portfolio.dialog.addStock.title'),
            displayNameHeader: t('portfolio'),
            valueHeader: t('portfolio.details.amount'),
          }}
          additionalContent={t('portfolio.dialog.addStock.text')}
          entries={portfolios.reduce(
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
          handleClose={() => setOpen(false)}
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
