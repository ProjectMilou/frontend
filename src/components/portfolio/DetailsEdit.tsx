import React, { useState } from 'react';
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
const useStyles = makeStyles(() =>
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

type ListContainerProps = {
  positions: Position[];
  updateFlagViaIsin: (isin: string, bool: boolean) => void;
};

type IsinToAmount = {
  [key: string]: string;
};

type FieldsAreOk = {
  [key: string]: boolean;
};

// ListContainer is the body inside the Edit-Popup
// A container that create list items from a list of stocks
const ListContainer: React.FC<ListContainerProps> = ({
  positions,
  updateFlagViaIsin,
}) => {
  // the following 4 statements are to keep track of the amount value (string!)
  // in the input fields as a state in this component
  const isinToAmount: IsinToAmount = {};

  positions.forEach((p) => {
    isinToAmount[p.stock.isin] = p.qty.toString();
  });

  const [tempPos, setTempPos] = useState(isinToAmount);

  const updateAmountViaIsin = (isin: string, amount: string) => {
    setTempPos({ ...tempPos, [isin]: amount });
  };

  // callback for the plus and minus button
  // second parameter decides decrement or increment
  const upOrDown = (isin: string, goUp: boolean) => {
    const stringAmount = tempPos[isin];
    if (Number.isNaN(parseFloat(stringAmount))) {
      setTempPos({ ...tempPos, [isin]: '0' });
    } else {
      const numberAmount = Number.parseFloat(stringAmount);
      const newStringAmount = goUp
        ? (numberAmount + 1).toString()
        : (numberAmount - 1).toString();
      setTempPos({ ...tempPos, [isin]: newStringAmount });
    }
  };

  // callback for the trash can button
  const setToZero = (isin: string) => {
    setTempPos({ ...tempPos, [isin]: '0' });
  };

  const classes = useStyles();
  return (
    <div>
      <List component="ol" className={classes.ol}>
        {positions.map((p) => (
          <ListItem key={p.stock.name}>
            <ListEntry
              isin={p.stock.isin}
              name={p.stock.name}
              amount={tempPos[p.stock.isin]}
              price={p.stock.price}
              updateAmountViaIsin={updateAmountViaIsin}
              updateFlagViaIsin={updateFlagViaIsin}
              upOrDown={upOrDown}
              setToZero={setToZero}
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

  // the following statements are to keep track of a global boolean flag
  // that is true if submit can be clicked (all input fields ok)
  // and false if it cannot be clicked
  const fieldsAreOk: FieldsAreOk = {};
  positions.forEach((p) => {
    fieldsAreOk[p.stock.isin] = true;
  });
  const [validFields, setValidFields] = useState(fieldsAreOk);
  const updateFlagViaIsin = (isin: string, bool: boolean) => {
    setValidFields({ ...validFields, [isin]: bool });
  };

  return (
    <div>
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
        style={{ minWidth: '40rem' }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('portfolio.details.dialogHeader')}
        </DialogTitle>
        <DialogContent dividers>
          <ListContainer
            positions={positions}
            updateFlagViaIsin={updateFlagViaIsin}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('portfolio.details.discardChanges')}
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            // checks if all input fields are ok and only then lets you click the button
            disabled={!Object.values(validFields).reduce((a, b) => a && b)}
          >
            {t('portfolio.details.saveChanges')}
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
