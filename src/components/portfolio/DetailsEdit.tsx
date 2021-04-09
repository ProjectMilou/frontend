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
import EuroCurrency from '../shared/EuroCurrency';

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
};

const DetailsEdit: React.FC<DetailsEditProps> = ({ positions, edit }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

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
                    <EuroCurrency value={p.stock.price} size="1em" />
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
    </div>
  );
};

export default DetailsEdit;
