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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editButton: {
      position: 'absolute',
      left: '6rem',
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
};

const DetailsEdit: React.FC<DetailsEditProps> = ({
  positions,
  edit,
  virtual,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={() => setOpen(true)}
        disabled={!positions?.length || !virtual}
      >
        {t('portfolio.details.editPortfolio')}
      </Button>
      {positions && (
        <EditDialog
          open={open}
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
          handleClose={() => setOpen(false)}
          action={(v) =>
            edit(Object.entries(v).map(([symbol, qty]) => ({ symbol, qty })))
          }
        />
      )}
    </>
  );
};

export default DetailsEdit;
