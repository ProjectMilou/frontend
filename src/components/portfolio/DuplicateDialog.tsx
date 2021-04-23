import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import NameDialog from './NameDialog';
import LimitedString from './LimitedString';

const useStyles = makeStyles({
  initialName: {
    fontWeight: 700,
  },
});

function validateName(newName?: string, oldName?: string): boolean {
  const n = newName?.trim();
  return !!(n && n.length && n !== oldName);
}

export type DuplicateDialogProps = {
  initialName?: string;
  open: boolean;
  handleClose: () => void;
  duplicate: (name: string) => Promise<void>;
};

const DuplicateDialog: React.FC<DuplicateDialogProps> = ({
  initialName,
  open,
  handleClose,
  duplicate,
}) => {
  // name of the portfolio that is duplicated
  const [name, setName] = React.useState<string>();

  // Only update the name when the dialog is opened to prevent updates
  // during the close animation.
  React.useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <NameDialog
      open={open}
      dialogTitle={t('portfolio.dialog.duplicate.title')}
      dialogText={
        <>
          {`${t('portfolio.dialog.duplicate.text')} `}
          <span className={classes.initialName}>
            <LimitedString value={initialName || ''} />
          </span>
        </>
      }
      labelKey="portfolio.name"
      actionKey="portfolio.duplicate"
      handleClose={handleClose}
      validate={(n) => validateName(n, initialName)}
      action={async (newName) =>
        newName ? duplicate(newName) : Promise.resolve()
      }
      initialName={t('portfolio.dialog.duplicate.defaultName', { name })}
    />
  );
};

export default DuplicateDialog;
