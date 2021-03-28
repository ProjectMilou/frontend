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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

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
    dialogHeaderFooter: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
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
      margin: '1rem 0',
    },
    // error helper text
    helperText: {
      position: 'absolute',
      top: '100%',
      right: '-50%',
      whiteSpace: 'nowrap',
    },
  })
);

type ListEntryProps = {
  id: number;
  name: string;
  checked: CheckedType;
  handleToggle: (id: number) => () => void;
  changeAmount: (id: number, amount: string) => void;
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
    <ListItem key={id} role={undefined} dense className={classes.listItem}>
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

// TODO: remove test type and object once api call is implemented
type TestPortType = {
  id: number;
  name: string;
};

const testPortfolios: TestPortType[] = [
  {
    id: 0,
    name: 'My Portfolio 1',
  },
  {
    id: 1,
    name: 'My Portfolio 2',
  },
  {
    id: 2,
    name: 'My Portfolio 3',
  },
  {
    id: 3,
    name: 'My Portfolio 4',
  },
];

type CheckedType = {
  [key: number]: string;
};

// returns the add to portfolio button and all subcomponents including the dialog window
const AddToPortfolioButton: React.FC = () => {
  // style and translation hooks
  const classes = useStyles();
  const { t } = useTranslation();
  // pattern for testing input fields
  const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;

  // TODO: replace with api call
  const portfolios = testPortfolios;

  // the state that controls whether the dialog window is open or closed
  const [open, setOpen] = React.useState(false);

  // the state that keeps track of whether the error pop-up is open or closed
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // handle saving selections
  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    // make api call
    const err = 'asdf';

    // if an error is returned show the error pop-up
    if (err) {
      setAnchorEl(event.currentTarget);
    } else {
      // close window once changes have been saved
      setOpen(false);
    }
  };

  // keep track of which portfolios have been selected and the amount in the textfield
  const [checked, setChecked] = React.useState<CheckedType>({});

  // handles checking and unchecking portfolios
  const handleCheckToggle = (id: number) => () => {
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
  const changeAmount = (id: number, amount: string) => {
    // when a user changes the input field the checked state gets updated
    setChecked({ ...checked, [id]: amount });
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.addButton}
        onClick={() => setOpen(true)}
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
        <MuiDialogTitle
          disableTypography
          className={classes.dialogHeaderFooter}
        >
          <span className={classes.span}>
            <Typography variant="h6" className={classes.text}>
              {t('analyzer.dialogHeader')}
            </Typography>
          </span>
          <IconButton
            aria-label="close"
            className={classes.headerCloseButton}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        {/* The body of the dialog window */}
        <MuiDialogContent dividers className={classes.DialogContent}>
          <List className={classes.List} component="ol">
            {portfolios.map((portfolio) => (
              <ListEntry
                id={portfolio.id}
                name={portfolio.name}
                checked={checked}
                handleToggle={handleCheckToggle}
                changeAmount={changeAmount}
                pattern={pattern}
              />
            ))}
          </List>
        </MuiDialogContent>
        {/* The footer of the dialog window */}
        <MuiDialogActions className={classes.dialogHeaderFooter}>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
              setChecked({});
            }}
            color="primary"
          >
            {t('portfolio.details.discardChanges')}
          </Button>
          <Button
            autoFocus
            onClick={handleSave}
            color="primary"
            disabled={
              !Object.values(checked)
                .map((stringAmount) => pattern.test(stringAmount))
                .every((v) => v)
            }
          >
            {t('portfolio.details.saveChanges')}
          </Button>
          {/* A small error pop-up */}
          <Popover
            id={anchorEl ? 'simple-popover' : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography>Possible Error</Typography>
          </Popover>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

// exports
export default AddToPortfolioButton;
