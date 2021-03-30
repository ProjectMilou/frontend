import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import NameDialog from './NameDialog';

function validateName(newName?: string): boolean {
  const n = newName?.trim();
  return !!(n && n.length);
}

export type CreateDialogProps = {
  open: boolean;
  handleClose: () => void;
  create: (name: string) => Promise<void>;
};

const CreateDialog: React.FC<CreateDialogProps> = ({
  open,
  handleClose,
  create,
}) => {
  const { t } = useTranslation();

  return (
    <NameDialog
      open={open}
      dialogTitle={t('portfolio.dialog.create.title')}
      dialogText={<Trans i18nKey="portfolio.dialog.create.text" />}
      labelKey="portfolio.name"
      actionKey="portfolio.create"
      handleClose={handleClose}
      validate={(n) => validateName(n)}
      action={async (newName) =>
        newName ? create(newName) : Promise.resolve()
      }
    />
  );
};

export default CreateDialog;
