import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import NameDialog from './NameDialog';

function validateName(newName?: string, oldName?: string): boolean {
  const n = newName?.trim();
  return !!(n && n.length && n !== oldName);
}

export type RenameDialogProps = {
  initialName?: string;
  open: boolean;
  handleClose: () => void;
  rename: (name: string) => Promise<void>;
};

const RenameDialog: React.FC<RenameDialogProps> = ({
  initialName,
  open,
  handleClose,
  rename,
}) => {
  const [oldName, setOldName] = React.useState<string>();

  // Only update the old name when the dialog is opened to prevent updates
  // during the close animation.
  React.useEffect(() => {
    if (open) {
      setOldName(initialName);
    }
  }, [open, initialName]);

  const { t } = useTranslation();

  return (
    <NameDialog
      open={open}
      dialogTitle={t('portfolio.dialog.rename.title')}
      dialogText={
        <Trans
          i18nKey="portfolio.dialog.rename.text"
          values={{ name: oldName }}
          components={{ portfolioName: <b /> }}
        />
      }
      labelKey="portfolio.name"
      actionKey="portfolio.rename"
      handleClose={handleClose}
      validate={(name) => validateName(name, initialName)}
      action={async (newName) =>
        newName ? rename(newName) : Promise.resolve()
      }
      initialName={oldName}
    />
  );
};

export default RenameDialog;
