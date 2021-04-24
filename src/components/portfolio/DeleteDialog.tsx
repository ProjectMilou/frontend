import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ProgressButton from './ProgressButton';
import { errorMessageKey, errorTitleKey } from '../../Errors';
import LimitedString from './LimitedString';

const useStyles = makeStyles({
  initialName: {
    fontWeight: 700,
  },
  lineBreak: {
    whiteSpace: 'pre-line',
  },
});

export type DeleteDialogProps = {
  initialName?: string;
  open: boolean;
  handleClose: () => void;
  deletePortfolio: () => Promise<void>;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  initialName,
  open,
  handleClose,
  deletePortfolio,
}) => {
  // name of the portfolio that is deleted
  const [name, setName] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>();

  // Only update the name when the dialog is opened to prevent updates
  // during the close animation.
  React.useEffect(() => {
    if (open) {
      setName(initialName);
      setLoading(false);
      setError(undefined);
    }
  }, [open, initialName]);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // prevent closing the dialog while loading
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      <DialogTitle>{t('portfolio.dialog.delete.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className={classes.lineBreak}>
            {`${t('portfolio.dialog.delete.text')} `}
            <span className={classes.initialName}>
              <LimitedString value={name || ''} />
            </span>
            {`\n${t('portfolio.dialog.delete.warning')}`}
          </div>
        </DialogContentText>
        {error && (
          <Typography color="error">
            <b>{t(errorTitleKey(error))}</b>: {t(errorMessageKey(error))}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading || !open}
          onClick={handleClose}
          color="primary"
        >
          {t('cancel')}
        </Button>
        <ProgressButton
          disabled={!open}
          onClick={async () => {
            setLoading(true);
            try {
              await deletePortfolio();
              handleClose();
            } catch (e) {
              setLoading(false);
              setError(e);
            }
          }}
          color="primary"
          loading={loading}
        >
          {t('portfolio.delete')}
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
