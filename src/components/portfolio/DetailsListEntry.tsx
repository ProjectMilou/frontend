import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

// stylesheet for the list items
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    userFields: {
      display: 'flex',
    },
    textDiv: {
      display: 'flex',
      width: '100%',
    },
    text: {
      margin: 'auto',
      width: '100%',
      height: 'min-content',
    },
  })
);

// type declerations
type BasicTextFieldProps = {
  isin: string;
  amount: string;
  updateAmountViaIsin: (isin: string, amount: string) => void;
  updateFlagViaIsin: (isin: string, bool: boolean) => void;
};

type ListEntryProps = {
  isin: string;
  name: string;
  amount: string;
  price: number;
  updateAmountViaIsin: (isin: string, amount: string) => void;
  updateFlagViaIsin: (isin: string, bool: boolean) => void;
  upOrDown: (isin: string, goUp: boolean) => void;
  setToZero: (isin: string) => void;
};

// input text field component
const BasicTextFields: React.FC<BasicTextFieldProps> = ({
  isin,
  amount,
  updateAmountViaIsin,
  updateFlagViaIsin,
}) => {
  const classes = useStyles();
  const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        value={amount}
        error={!amount.match(pattern)}
        helperText={
          amount.match(pattern) ? '' : 'Please enter positive number!'
        }
        onChange={(e) => {
          if (amount.match(pattern)) {
            updateFlagViaIsin(isin, true);
          } else {
            updateFlagViaIsin(isin, false);
          }
          updateAmountViaIsin(isin, e.target.value);
        }}
        id="outlined-basic"
        label="quantity"
        variant="outlined"
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
        style={{ width: '4rem' }}
      />
    </form>
  );
};

// list entry component
const ListEntry: React.FC<ListEntryProps> = ({
  isin,
  name,
  amount,
  price,
  updateAmountViaIsin,
  updateFlagViaIsin,
  upOrDown,
  setToZero,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <div className={classes.textDiv}>
        <p className={classes.text}>{name}</p>
      </div>
      <div className={classes.textDiv}>
        <p className={classes.text}>{`$${price}`}</p>
      </div>
      <div className={classes.userFields}>
        <IconButton aria-label="minus" onClick={() => upOrDown(isin, false)}>
          <RemoveIcon />
        </IconButton>
        <BasicTextFields
          amount={amount}
          updateAmountViaIsin={updateAmountViaIsin}
          isin={isin}
          updateFlagViaIsin={updateFlagViaIsin}
        />
        <IconButton aria-label="plus" onClick={() => upOrDown(isin, true)}>
          <AddIcon />
        </IconButton>
        <IconButton aria-label="zero" onClick={() => setToZero(isin)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

// exports
export default ListEntry;
