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
  })
);

type ListContainerProps = {
  handleToggle: (id: number) => () => void;
};

const ListContainer: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<number[]>([]);

  // handles checking and unchecking portfolios (taken from MaterialUI List Controls)
  const handleToggle = (id: number) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.List}>
      {[0, 1, 2, 3].map((portfolioId) => {
        const labelId = `checkbox-list-label-${portfolioId}`;

        return (
          <ListItem
            key={portfolioId}
            role={undefined}
            dense
            button
            // disableRipple?
            onClick={handleToggle(portfolioId)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(portfolioId) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                color="secondary"
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Portfolio ${portfolioId}`} />
            <Button
              style={{
                display: checked.indexOf(portfolioId) !== -1 ? 'block' : 'none',
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

// returns the add to portfolio button and all subcomponents including the dialog window
const AddToPortfolioButton: React.FC = () => {
  // style and translation hooks
  const classes = useStyles();
  const { t } = useTranslation();

  // open and close dialog window
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

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

  const handleErrorClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.addButton}
        onClick={handleDialogOpen}
      >
        {t('analyzer.addToPortfolio')}
      </Button>
      <Dialog
        onClose={handleDialogClose}
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
            onClick={handleDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        {/* The body of the dialog window */}
        <MuiDialogContent dividers className={classes.DialogContent}>
          <ListContainer />
        </MuiDialogContent>
        {/* The footer of the dialog window */}
        <MuiDialogActions className={classes.dialogHeaderFooter}>
          <Button autoFocus onClick={handleDialogClose} color="primary">
            {t('portfolio.details.discardChanges')}
          </Button>
          <Button autoFocus onClick={handleSave} color="primary">
            {t('portfolio.details.saveChanges')}
          </Button>
          {/* A small error pop-up */}
          <Popover
            id={anchorEl ? 'simple-popover' : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleErrorClose}
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
