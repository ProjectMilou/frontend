import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import ProgressButton from './ProgressButton';
import { errorMessageKey, errorTitleKey } from '../../Errors';

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
          <Trans
            i18nKey="portfolio.dialog.delete.text"
            values={{ name }}
            components={{ portfolioName: <b /> }}
          />
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
