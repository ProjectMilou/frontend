import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
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
  amount: number;
};

type ListEntryProps = {
  name: string;
  amount: number;
  price: number;
};

// input text field component
const BasicTextFields: React.FC<BasicTextFieldProps> = ({ amount }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const pattern = /^[1-9]\d*$/;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        defaultValue={amount}
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
const ListEntry: React.FC<ListEntryProps> = ({ name, amount, price }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.listItem}>
      <div className={classes.textDiv}>
        <p className={classes.text}>{name}</p>
      </div>
      <div className={classes.textDiv}>
        <p className={classes.text}>{`$${price}`}</p>
      </div>
      <div className={classes.userFields}>
        <IconButton aria-label="minus">
          <RemoveIcon />
        </IconButton>
        <BasicTextFields amount={amount} />
        <IconButton aria-label="plus">
          <AddIcon />
        </IconButton>
        <IconButton aria-label="zero">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

// exports
export default ListEntry;
