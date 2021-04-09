import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import { Position, PositionQty } from '../../portfolio/APIClient';
import ProgressButton from './ProgressButton';
import { errorMessageKey, errorTitleKey } from '../../Errors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subContainer: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    editButton: {
      position: 'absolute',
      left: '6rem',
      padding: '0.25rem 1rem',
      backgroundColor: '#3fbcf2',
      '&:hover': {
        backgroundColor: '#84d4f7',
      },
      whiteSpace: 'nowrap',
    },
    Dialog: {
      minWidth: '80rem',
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
    // dialog body
    DialogContent: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      margin: 0,
      padding: theme.spacing(1),
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
    textDivPrice: {
      display: 'flex',
      width: '100%',
      justifyContent: 'end',
      paddingRight: '15%',
    },
    textPrice: {
      width: 'min-content',
    },
    text: {
      margin: 'auto',
      width: '100%',
      height: 'min-content',
    },
    ol: {
      padding: 0,
    },
    helperText: {
      position: 'absolute',
      top: '75%',
      right: '-100%',
      whiteSpace: 'nowrap',
    },
    // legend
    legendWrapper: {
      display: 'flex',
      padding: '0 16px',
    },
    legendItem: {
      width: '100%',
    },
  })
);

type DetailsEditProps = {
  positions?: Position[];
  edit: (modifications: PositionQty[]) => Promise<void>;
};

// needed for tempPos (tracking user input to the amount text fields)
type SymbolToAmount = {
  [key: string]: string;
};

const DetailsEdit: React.FC<DetailsEditProps> = ({ positions, edit }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: refactor state hooks to a reducer
  // A state that controls whether the dialog window is open or closed
  const [open, setOpen] = React.useState(false);
  // true when waiting for an API response
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>();

  // the following tracks the temporary state of the amount for each position that the user enters
  // the amount is formatted as string because the user might enter NaN values
  // TODO: fix this mess
  const [tempPos, setTempPos] = useState<SymbolToAmount>({});

  const closeDialog = () => setOpen(false);
  const openDialog = () => {
    // reset the dialog's state on (re-)open
    setLoading(false);
    setError(undefined);
    setOpen(true);

    const symbolToAmount: SymbolToAmount = {};
    if (positions) {
      positions.forEach((p) => {
        symbolToAmount[p.stock.symbol] = p.qty.toString();
      });
    }
    setTempPos(symbolToAmount);
  };

  // helper function for minus button
  const decrement = (isin: string) => {
    const stringAmount = tempPos[isin];
    if (Number.isNaN(parseFloat(stringAmount))) {
      setTempPos({ ...tempPos, [isin]: '0' });
    } else {
      const numberAmount = Number.parseFloat(stringAmount);
      setTempPos({
        ...tempPos,
        [isin]: numberAmount === 0 ? '0' : (numberAmount - 1).toString(),
      });
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

  return (
    <div className={classes.subContainer}>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={() => openDialog()}
        disabled={!positions?.length}
      >
        {t('portfolio.details.editPortfolio')}
      </Button>
      <Dialog
        onClose={() => closeDialog()}
        open={open}
        className={classes.Dialog}
        // prevent closing the dialog while loading
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
      >
        {/* The header of the dialog window */}
        <MuiDialogTitle
          disableTypography
          className={classes.dialogHeaderFooter}
        >
          <Typography variant="h6" className={classes.text}>
            {t('portfolio.details.dialogHeader')}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.headerCloseButton}
            onClick={() => closeDialog()}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent dividers className={classes.DialogContent}>
          <div className={classes.legendWrapper}>
            <span className={classes.legendItem}>
              {t('portfolio.details.stock')}
            </span>
            <span className={classes.legendItem}>
              {t('portfolio.details.price')}
            </span>
            <span className={classes.legendItem}>
              {t('portfolio.details.amount')}
            </span>
          </div>
          <List className={classes.ol}>
            {/* the following map statement represents each position line (formerly "DetailsListEntry.tsx) */}
            {positions &&
              positions.map((position) => (
                <ListItem
                  key={position.stock.symbol}
                  className={classes.listItem}
                >
                  <div className={classes.textDiv}>
                    <span className={classes.text}>{position.stock.name}</span>
                  </div>
                  <div className={classes.textDivPrice}>
                    <span className={classes.textPrice}>
                      {position.stock.price}
                    </span>
                  </div>
                  <div className={classes.userFields}>
                    <IconButton
                      aria-label="minus"
                      onClick={() => decrement(position.stock.symbol)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      variant="outlined"
                      value={tempPos[position.stock.symbol]}
                      error={!pattern.test(tempPos[position.stock.symbol])}
                      helperText={
                        pattern.test(tempPos[position.stock.symbol])
                          ? undefined
                          : 'Please enter a positive number!'
                      }
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                      onChange={(e) => {
                        // when a user changes the input field the tempPos state gets updated
                        setTempPos({
                          ...tempPos,
                          [position.stock.symbol]: e.target.value,
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
                      onClick={() => increment(position.stock.symbol)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      aria-label="zero"
                      onClick={() => setToZero(position.stock.symbol)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </ListItem>
              ))}
          </List>
          {error && (
            <Typography color="error">
              <b>{t(errorTitleKey(error))}</b>: {t(errorMessageKey(error))}
            </Typography>
          )}
        </MuiDialogContent>
        <MuiDialogActions className={classes.dialogHeaderFooter}>
          <Button
            disabled={loading}
            onClick={() => closeDialog()}
            color="primary"
          >
            {t('portfolio.details.discardChanges')}
          </Button>
          <ProgressButton
            onClick={async () => {
              setLoading(true);
              try {
                await edit(
                  Object.entries(tempPos).map(([symbol, qty]) => ({
                    symbol,
                    // TODO: use react-number-format for validation,
                    //  store numbers instead of strings, avoid converting
                    qty: Number.parseFloat(qty),
                  }))
                );
                closeDialog();
              } catch (e) {
                setLoading(false);
                setError(e);
              }
            }}
            color="primary"
            disabled={
              !Object.values(tempPos)
                .map((stringAmount) => pattern.test(stringAmount))
                .every((v) => v)
            }
            loading={loading}
          >
            {t('portfolio.details.saveChanges')}
          </ProgressButton>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

export default DetailsEdit;
