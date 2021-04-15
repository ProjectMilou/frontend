import React from 'react';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@material-ui/core';
import { Position, PositionQty } from '../../portfolio/APIClient';
import EditDialog from './EditDialog';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import DuplicateDialog from './DuplicateDialog';
import * as API from '../../portfolio/APIClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subContainer: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      margin: '0 1rem',
      left: '3rem',
      padding: '0.25rem 1rem',
      backgroundColor: theme.palette.lightBlue.main,
      '&:hover': {
        backgroundColor: lighten(theme.palette.lightBlue.main, 0.35),
      },
      whiteSpace: 'nowrap',
    },
  })
);

type DetailsEditProps = {
  positions?: Position[];
  edit: (modifications: PositionQty[]) => Promise<void>;
  virtual: boolean;
  id: string;
};

const DetailsEdit: React.FC<DetailsEditProps> = ({
  positions,
  edit,
  virtual,
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openDuplicate, setOpenDuplicate] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <div className={classes.subContainer}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => setOpenEdit(true)}
        disabled={!positions?.length || !virtual}
      >
        {virtual
          ? t('portfolio.details.editPortfolio')
          : t('portfolio.details.cannotEditPortfolio')}
      </Button>
      {positions && (
        <EditDialog
          open={openEdit}
          strikethroughCleared
          strings={{
            title: t('portfolio.dialog.edit.title'),
            displayNameHeader: t('portfolio.details.stock'),
            valueHeader: t('portfolio.details.amount'),
          }}
          additionalContent={t('portfolio.dialog.edit.text')}
          additionalTableHeadCells={
            <TableCell>{t('portfolio.details.price')}</TableCell>
          }
          entries={positions.reduce(
            (acc, p) => ({
              ...acc,
              [p.stock.symbol]: {
                displayName: p.stock.name,
                value: p.qty,
                additionalTableCells: (
                  <TableCell>
                    <StyledNumberFormat value={p.stock.price} suffix="€" />
                  </TableCell>
                ),
              },
            }),
            {}
          )}
          handleClose={() => setOpenEdit(false)}
          action={(v) =>
            edit(Object.entries(v).map(([symbol, qty]) => ({ symbol, qty })))
          }
        />
      )}
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => setOpenDuplicate(true)}
      >
        {t('portfolio.dialog.duplicate.title')}
      </Button>
      {/* adapted from Dashboard.tsx */}
      {/* TODO use real name */}
      <DuplicateDialog
        initialName="CHANGE TO REAL NAME"
        open={openDuplicate}
        handleClose={() => setOpenDuplicate(false)}
        duplicate={async (newName) => {
          if (id) {
            const newId = await API.duplicate(id, newName);
            // TODO update list of portfolios in dashboard?
          }
        }}
      />
    </div>
  );
};

export default DetailsEdit;
