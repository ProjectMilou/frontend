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
import { Position } from '../../portfolio/APIClient';

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
};

// needed for tempPos (tracking user input to the amount text fields)
type IsinToAmount = {
  [key: string]: string;
};

const DetailsEdit: React.FC<DetailsEditProps> = ({ positions }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // A state that controls whether the dialog window is open or closed
  const [open, setOpen] = React.useState(false);

  // the following tracks the temporary state of the amount for each position that the user enters
  // the amount is formatted as string because the user might enter NaN values
  // TODO: fix this mess
  const [tempPos, setTempPos] = useState<IsinToAmount>({});
  React.useEffect(() => {
    const isinToAmount: IsinToAmount = {};
    if (positions) {
      positions.forEach((p) => {
        isinToAmount[p.stock.isin] = p.qty.toString();
      });
    }
    setTempPos(isinToAmount);
  }, [positions]);

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

  const handleSaveChanges = () => {
    // TODO implement logic for api call and updating the global positions in details
    // TODO watch out right now empty input is also allowed ("")
    // console.log(tempPos);
    setOpen(false);
  };

  const handleDiscardChanges = () => {
    // TODO implement logic for properly closing the dialog.
    // each time it is rendered from scratch it should take the start values from positions again
    setOpen(false);
  };

  return (
    <div className={classes.subContainer}>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={() => setOpen(true)}
        disabled={!positions?.length}
      >
        {t('portfolio.details.editPortfolio')}
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        className={classes.Dialog}
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
            onClick={handleDiscardChanges}
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
                  key={position.stock.isin}
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
                      onClick={() => decrement(position.stock.isin)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      variant="outlined"
                      value={tempPos[position.stock.isin]}
                      error={!pattern.test(tempPos[position.stock.isin])}
                      helperText={
                        pattern.test(tempPos[position.stock.isin])
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
        </MuiDialogContent>
        <MuiDialogActions className={classes.dialogHeaderFooter}>
          <Button onClick={handleDiscardChanges} color="primary">
            {t('portfolio.details.discardChanges')}
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            disabled={
              !Object.values(tempPos)
                .map((stringAmount) => pattern.test(stringAmount))
                .every((v) => v)
            }
          >
            {t('portfolio.details.saveChanges')}
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

export default DetailsEdit;
