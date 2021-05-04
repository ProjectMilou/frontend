import React from 'react';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { TableCell, Tooltip, Button } from '@material-ui/core';
import { Position, PositionQty } from '../../portfolio/APIClient';
import EditDialog from './EditDialog';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import DuplicateDialog from './DuplicateDialog';
import * as API from '../../portfolio/APIClient';
import EditDialogAddStock from './EditDialogAddStock';

type StyleProps = {
  virtual?: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    subContainer: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      margin: '0 1rem',
      padding: '0.25rem 1rem',
      backgroundColor: theme.palette.lightBlue.main,
      '&:hover': {
        backgroundColor: lighten(theme.palette.lightBlue.main, 0.35),
      },
      whiteSpace: 'nowrap',
    },
    buttonWrapper: {
      position: 'relative',
      left: '3rem',
      cursor: (props) => (props.virtual ? 'url' : 'not-allowed'),
    },
    tooltip: {
      maxWidth: 400,
      fontSize: '0.9rem',
      whiteSpace: 'pre-line',
    },
  })
);

type DetailsEditProps = {
  positions?: Position[];
  edit: (modifications: PositionQty[]) => Promise<void>;
  virtual?: boolean;
  name?: string;
  id: string;
};

const DetailsEdit: React.FC<DetailsEditProps> = ({
  positions,
  edit,
  virtual,
  id,
  name,
}) => {
  const classes = useStyles({ virtual });
  const { t } = useTranslation();
  const [openDuplicate, setOpenDuplicate] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <div className={classes.subContainer}>
      <Tooltip
        title={
          virtual ? '' : t('portfolio.details.cannotEditPortfolio').toString()
        }
        classes={{ tooltip: classes.tooltip }}
      >
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setOpenEdit(true)}
            disabled={!virtual}
          >
            {t('portfolio.details.editPortfolio')}
          </Button>
        </div>
      </Tooltip>
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
                initialValue: p.qty,
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
          AddEntry={EditDialogAddStock}
        />
      )}
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setOpenDuplicate(true)}
        >
          {t('portfolio.dialog.duplicate.title')}
        </Button>
      </div>
      <DuplicateDialog
        initialName={name}
        open={openDuplicate}
        handleClose={() => setOpenDuplicate(false)}
        duplicate={async (newName) => {
          await API.duplicate(id, newName);
        }}
      />
    </div>
  );
};

export default DetailsEdit;
