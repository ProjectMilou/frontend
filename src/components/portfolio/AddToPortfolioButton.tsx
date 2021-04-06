import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import * as API from '../../portfolio/APIClient';
import { errorMessageKey, errorTitleKey } from '../../Errors';
import ProgressButton from './ProgressButton';

// stylesheet for the entire add to portfolio component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      padding: '0.25rem 1rem',
      backgroundColor: '#3fbcf2',
      '&:hover': {
        backgroundColor: '#84d4f7',
      },
      whiteSpace: 'nowrap',
    },
    Dialog: {
      minWidth: '40rem',
    },
    dialogHeader: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    // dialog header
    headerCloseButton: {
      position: 'relative',
      color: theme.palette.grey[500],
    },
    span: {
      display: 'flex',
    },
    text: {
      margin: 'auto',
    },
    // dialog body
    DialogContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 0,
      padding: theme.spacing(1),
    },
    // List component
    List: {
      width: '100%',
      backgroundColor: 'white',
    },
    listItem: {
      width: '100%',
      margin: '0.75rem 0',
      height: '3.25rem',
    },
    // error helper text
    helperText: {
      position: 'absolute',
      top: '100%',
      right: '-50%',
      whiteSpace: 'nowrap',
    },
    dialogFooter: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'end',
    },
  })
);

type ListEntryProps = {
  id: string;
  name: string;
  checked: CheckedType;
  handleToggle: (id: string) => () => void;
  changeAmount: (id: string, amount: string) => void;
  pattern: RegExp;
};

const ListEntry: React.FC<ListEntryProps> = ({
  id,
  name,
  checked,
  handleToggle,
  changeAmount,
  pattern,
}) => {
  const classes = useStyles();

  return (
    <ListItem role={undefined} dense className={classes.listItem}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={typeof checked[id] !== 'undefined'}
          tabIndex={-1}
          disableRipple
          inputProps={{
            'aria-labelledby': `checkbox-list-label-${id}`,
          }}
          color="secondary"
          onClick={handleToggle(id)}
        />
      </ListItemIcon>
      <ListItemText primary={name} />
      <TextField
        variant="outlined"
        value={checked[id]}
        error={!pattern.test(checked[id])}
        helperText={
          pattern.test(checked[id]) ? '' : 'Please enter a positive number!'
        }
        FormHelperTextProps={{
          className: classes.helperText,
        }}
        onChange={(e) => {
          changeAmount(id, e.target.value);
        }}
        size="small"
        margin="dense"
        inputProps={{
          maxLength: 5,
          style: {
            textAlign: 'center',
            paddingRight: 0,
            paddingLeft: '0.2rem',
          },
        }}
        style={{
          display: typeof checked[id] !== 'undefined' ? 'block' : 'none',
          width: '4rem',
        }}
      />
    </ListItem>
  );
};

type CheckedType = {
  // id of portfolio: qty of stock;
  [id: string]: string;
};

type AddToPortfolioButtonType = {
  isin: string;
  token: string;
};

// returns the add to portfolio button and all subcomponents including the dialog window
const AddToPortfolioButton: React.FC<AddToPortfolioButtonType> = ({
  isin,
  token,
}) => {
  // style and translation hooks
  const classes = useStyles();
  const { t } = useTranslation();
  // pattern for testing input fields
  const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;

  // the list of portfolios belonging to the user
  const [portfolios, setPortfolios] = React.useState<API.PortfolioOverview[]>(
    []
  );

  // the state that controls whether the dialog window is open or closed
  const [open, setOpen] = React.useState(false);
  // true when waiting for an API response
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>();
  // keep track of which portfolios have been selected and the amount in the textfield
  const [checked, setChecked] = React.useState<CheckedType>({});

  // defines function to fetch from api
  const isMounted = React.useRef(true);
  const fetch = async () => {
    setError(undefined);
    try {
      const p = await API.list(token);
      if (isMounted.current) {
        setPortfolios(p);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
      }
    }
  };

  // opon mount fetch list of portfolios from api
  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialog = () => {
    // reset the dialog's state on (re-)open
    setLoading(false);
    setError(undefined);
    setChecked({});
    setOpen(true);
  };

  // handle saving selections
  const handleSave = async () => {
    setLoading(true);

    try {
      // parse the checked state into the form expected by the api
      const modifications: API.PortfoliosQty[] = Object.entries(checked).map(
        ([id, qty]) => ({
          id,
          // TODO: use react-number-format for validation,
          //  store numbers instead of strings, avoid converting
          qty: Number.parseFloat(qty),
        })
      );
      // make api put call
      await API.stock(token, isin, modifications);
      setOpen(false);
    } catch (e) {
      // on error stop the loading animation and display error to user
      setLoading(false);
      setError(e);
    }
  };

  // handles checking and unchecking portfolios
  const handleCheckToggle = (id: string) => () => {
    const newChecked = { ...checked };

    if (typeof newChecked[id] === 'undefined') {
      // if unchecked, check it with an initial value of 1
      newChecked[id] = '1';
    } else {
      // if checked remove check
      delete newChecked[id];
    }

    setChecked(newChecked);
  };

  //  a function that sets the amount everytime a textfield is changed
  const changeAmount = (id: string, amount: string) => {
    // when a user changes the input field the checked state gets updated
    setChecked({ ...checked, [id]: amount });
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.addButton}
        onClick={() => openDialog()}
      >
        {t('analyzer.addToPortfolio')}
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        open={open}
        className={classes.Dialog}
      >
        {/* The header of the dialog window */}
        <MuiDialogTitle disableTypography className={classes.dialogHeader}>
          <span className={classes.span}>
            <Typography variant="h6" className={classes.text}>
              {t('analyzer.dialogHeader')}
            </Typography>
          </span>
        </MuiDialogTitle>
        {/* The body of the dialog window */}
        <MuiDialogContent dividers className={classes.DialogContent}>
          <List className={classes.List} component="ol">
            {portfolios.map((portfolio) => (
              <ListEntry
                key={portfolio.id}
                id={portfolio.id}
                name={portfolio.name}
                checked={checked}
                handleToggle={handleCheckToggle}
                changeAmount={changeAmount}
                pattern={pattern}
              />
            ))}
          </List>
          {error && (
            <Typography color="error">
              <b>{t(errorTitleKey(error))}</b>: {t(errorMessageKey(error))}
            </Typography>
          )}
        </MuiDialogContent>
        {/* The footer of the dialog window */}
        <MuiDialogActions className={classes.dialogFooter}>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            {t('portfolio.details.discardChanges')}
          </Button>
          <ProgressButton
            onClick={handleSave}
            color="primary"
            loading={loading}
            disabled={
              !Object.values(checked)
                .map((stringAmount) => pattern.test(stringAmount))
                .every((v) => v)
            }
          >
            {t('portfolio.details.saveChanges')}
          </ProgressButton>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

// exports
export default AddToPortfolioButton;
