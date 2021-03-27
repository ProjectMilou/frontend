import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ProgressButton from './ProgressButton';
import { ErrorCode, errorMessageKey } from '../../Errors';

export type NameDialogProps = {
  initialName?: string;
  open: boolean;
  dialogTitle: React.ReactNode;
  dialogText: React.ReactNode;
  labelKey: string;
  actionKey: string;
  handleClose: () => void;
  validate: (name?: string) => boolean;
  action: (name?: string) => Promise<void>;
};

/**
 * A generic dialog that prompts the user to input a name.
 *
 * @param initialName - Name that is in the textbox initially
 * @param open - Whether the dialog is open
 * @param dialogTitle - The title of the dialog
 * @param dialogText - The contents of the dialog
 * @param labelKey - Translation key for the textbox label
 * @param actionKey - Translation key for the dialog action
 * @param handleClose - Called when the dialog is closed
 * @param validate - Validation function for the name input
 * @param action - Called when the user confirms the dialog
 */
const NameDialog: React.FC<NameDialogProps> = ({
  initialName,
  open,
  dialogTitle,
  dialogText,
  labelKey,
  actionKey,
  handleClose,
  validate,
  action,
}) => {
  // The dialog is not unmounted on close, so these states
  // remain when the dialog is opened multiple times.
  const [name, setName] = React.useState<string>(initialName || '');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorCode | undefined>();

  /* If the open property changed, the dialog was re-opened, possibly for a
   * different portfolio, so the state must be reset. State is not changed on
   * close to prevent visible changes during the close animation.
   */
  React.useEffect(() => {
    if (open) {
      setName(initialName || '');
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
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={t(labelKey)}
          value={name}
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => setName(e.currentTarget.value)}
          error={!!error}
          helperText={error && t(errorMessageKey(error))}
        />
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
          disabled={!validate(name) || !open}
          onClick={async () => {
            setLoading(true);
            try {
              await action(name?.trim());
              handleClose();
            } catch (e) {
              setLoading(false);
              setError(e.message);
            }
          }}
          color="primary"
          loading={loading}
        >
          {t(actionKey)}
        </ProgressButton>
      </DialogActions>
    </Dialog>
  );
};

export default NameDialog;
