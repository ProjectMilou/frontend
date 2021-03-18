import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

type BasicTextFieldProps = {
  amount: number;
};

const BasicTextFields: React.FC<BasicTextFieldProps> = ({ amount }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="quantity"
        variant="outlined"
        defaultValue={amount}
      />
    </form>
  );
};

type ListEntryProps = {
  name: string;
  amount: number;
  price: number;
};

const ListEntry: React.FC<ListEntryProps> = ({ name, amount, price }) => (
  <div>
    <div>
      <p>{name}</p>
    </div>
    <div>
      <p>{price}</p>
    </div>
    <div>
      <Button>-</Button>
      <BasicTextFields amount={amount} />
      <Button>+</Button>
      <Button>Delete</Button>
    </div>
  </div>
);

export default ListEntry;
