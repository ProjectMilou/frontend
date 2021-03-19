import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ListEntry from './DetailsListEntry';

// type declarations
interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

// styles
// stylesheet for the editButton component
const useStyles = makeStyles({
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
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

// actual components

// ListContainer is the body inside the Edit-Popup
const positions = [
  { name: 'BMW', amount: 10, price: 11.5 },
  { name: 'Mercedes', amount: 8, price: 22.4 },
  { name: 'BMW', amount: 10, price: 5.1 },
];

const ListContainer: React.FC = () => {
  const [posState, setPosState] = useState(positions);
  return (
    <div>
      <ol>
        {posState.map((p) => (
          <ListEntry name={p.name} amount={p.amount} price={p.price} />
        ))}
      </ol>
    </div>
  );
};

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
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

function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={handleClickOpen}
      >
        {t('editPortfolio')}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Here you can adjust the positions of your portfolio
        </DialogTitle>
        <DialogContent dividers>
          <ListContainer />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Discard changes
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// returns the edit button and all subcomponents
const DetailsEdit: React.FC = () => {
  const classes = useStyles();

  return (
    <div id="subContainer" className={classes.subContainer}>
      <div style={{ marginLeft: '3.8rem' }}>
        <CustomizedDialogs />
      </div>
    </div>
  );
};

// exports
export default DetailsEdit;
