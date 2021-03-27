import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { List, ListItem } from '@material-ui/core';
import { Position } from './DetailsTypes';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
    },
    closeButton: {
      position: 'relative',
      color: theme.palette.grey[500],
    },
    span: {
      display: 'flex',
    },
    text: {
      margin: 'auto',
    },
  });

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
    editButton: {
      padding: '0.25rem 1rem',
      backgroundColor: '#3fbcf2',
      '&:hover': {
        backgroundColor: '#84d4f7',
      },
    },
    subContainer: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    ol: {
      padding: 0,
    },
  })
);

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

type DetailsEditProps = {
  positions: Position[];
};

// needed for tempPos (tracking user input to the amount text fields)
type IsinToAmount = {
  [key: string]: string;
};

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <span className={classes.span}>
        <Typography variant="h6" className={classes.text}>
          {children}
        </Typography>
      </span>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DetailsEdit: React.FC<DetailsEditProps> = ({ positions }) => {
  // TODO delete the open state and handlers if we do not need them
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  // the following tracks the temporary state of the amount for each position that the user enters
  // the amount is formatted as string because the user might enter NaN values
  const isinToAmount: IsinToAmount = {};
  positions.forEach((p) => {
    isinToAmount[p.stock.isin] = p.qty.toString();
  });
  const [tempPos, setTempPos] = useState(isinToAmount);

  // helper function for minus button
  const decrement = (isin: string) => {
    const stringAmount = tempPos[isin];
    if (Number.isNaN(parseFloat(stringAmount))) {
      setTempPos({ ...tempPos, [isin]: '0' });
    } else {
      const numberAmount = Number.parseFloat(stringAmount);
      const newStringAmount = (numberAmount - 1).toString();
      setTempPos({ ...tempPos, [isin]: newStringAmount });
    }
  };

  // helper function for plus button
  const increment = (isin: string) => {
    const stringAmount = tempPos[isin];
    if (Number.isNaN(parseFloat(stringAmount))) {
      setTempPos({ ...tempPos, [isin]: '0' });
    } else {
      const numberAmount = Number.parseFloat(stringAmount);
      const newStringAmount = (numberAmount + 1).toString();
      setTempPos({ ...tempPos, [isin]: newStringAmount });
    }
  };

  // helper function for trash can button
  const setToZero = (isin: string) => {
    setTempPos({ ...tempPos, [isin]: '0' });
  };

  // pattern for testing input fields
  const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;

  const handleSaveChanges = () => {
    // TODO implement logic for api call and updating the global positions in details
    // TODO watch out right now empty input is also allowed ("")
    console.log(tempPos);
  };

  const handleDiscardChanges = () => {
    // TODO implement logic for properly closing the dialog.
    // each time it is rendered from scratch it should take the start values from positions again
  };

  return (
    <div className={classes.subContainer}>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={handleClickOpen}
      >
        {t('portfolio.details.editPortfolio')}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          {/* Legend for the positions */}
          {/* TODO add translation for legend */}
          <p>Stock</p>
          <p>Price</p>
          <p>Amount</p>
          <List component="ol" className={classes.ol}>
            {/* the following map statement represents each position line (formerly "DetailsListEntry.tsx) */}
            {positions.map((position) => (
              <ListItem key={position.stock.isin} className={classes.listItem}>
                <div className={classes.textDiv}>
                  <p className={classes.text}>{position.stock.name}</p>
                </div>
                <div className={classes.textDiv}>
                  <p className={classes.text}>{position.stock.price}</p>
                </div>
                <div className={classes.userFields}>
                  <IconButton
                    aria-label="minus"
                    onClick={() => decrement(position.stock.isin)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {/* the value in the text field below needs to take the amount from tempPos - NOT position - so the sate updates correctly */}
                  {/* TODO add translation for helper text */}
                  <TextField
                    variant="outlined"
                    value={tempPos[position.stock.isin]}
                    error={!pattern.test(tempPos[position.stock.isin])}
                    helperText={
                      pattern.test(tempPos[position.stock.isin])
                        ? ''
                        : 'Please enter positive number!'
                    }
                    onChange={(e) => {
                      // when a user changes the input field the tempPos state gets updated
                      setTempPos({
                        ...tempPos,
                        [position.stock.isin]: e.target.value,
                      });
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
                    style={{ width: '4rem' }}
                  />
                  <IconButton
                    aria-label="plus"
                    onClick={() => increment(position.stock.isin)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    aria-label="zero"
                    onClick={() => setToZero(position.stock.isin)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Discard changes
          </Button>
          <Button
            autoFocus
            onClick={handleSaveChanges}
            color="primary"
            disabled={
              !Object.values(tempPos)
                .map((stringAmount) => pattern.test(stringAmount))
                .every((v) => v)
            }
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailsEdit;
