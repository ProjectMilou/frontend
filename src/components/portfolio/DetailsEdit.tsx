import React from 'react';
import { Button, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  createStyles,
  makeStyles,
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
import { Position } from './DetailsTypes';

// stylesheet for the editButton component
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
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

// stylesheet for the MaterialUi components
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

// type declarations
interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

// type declaration of the edit button props
type DetailsEditProps = {
  // list of positions
  positions: Position[];
};

// ListContainer is the body inside the Edit-Popup
// A container that create list items from a list of stocks
const ListContainer: React.FC<DetailsEditProps> = ({ positions }) => {
  const [posState, setPosState] = React.useState(positions);

  const classes = useStyles();
  return (
    <div>
      <List component="ol" className={classes.ol}>
        {posState.map((p) => (
          <ListItem key={p.stock.name}>
            <ListEntry
              name={p.stock.name}
              amount={p.qty}
              price={p.stock.price}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

// the header component created by MaterialUI
const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
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

// the body component created by MaterialUI
const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// the footer component created by MaterialUI
const DialogActions = withStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// the dialog component with button logic
// TODO: change typing
function CustomizedDialogs(positions: Position[]) {
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
        style={{ minWidth: '40rem' }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('dialogHeader')}
        </DialogTitle>
        <DialogContent dividers>
          <ListContainer positions={positions} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('discardChanges')}
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// returns the edit button and all subcomponents including the dialog window
const DetailsEdit: React.FC<DetailsEditProps> = ({ positions }) => {
  const classes = useStyles();

  return (
    <div id="subContainer" className={classes.subContainer}>
      <div style={{ marginLeft: '3.8rem' }}>{CustomizedDialogs(positions)}</div>
    </div>
  );
};

// exports
export default DetailsEdit;
