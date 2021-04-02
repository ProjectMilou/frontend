import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  lighten,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';
import EuroCurrency from '../shared/EuroCurrency';
import Performance from '../shared/Performance';

const useStyles = makeStyles((theme: Theme) => ({
  action: { display: 'inline-block' },
  row: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
  },
  positionCount: {
    fontSize: '24px',
  },
  disabled: {
    cursor: 'not-allowed',
  },
}));

export type DashboardTableRowProps = {
  portfolio: PortfolioOverview;
  selectPortfolio: (id: string) => void;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableRow
      onClick={() => {
        selectPortfolio(portfolio.id);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center">{portfolio.score}</TableCell>
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={<Typography color="primary">{portfolio.name}</Typography>}
          secondary={
            portfolio.virtual ? t('portfolio.virtual') : t('portfolio.real')
          }
          secondaryTypographyProps={{
            color: portfolio.virtual ? 'textSecondary' : 'secondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.positionCount}>
        {portfolio.positionCount}
      </TableCell>
      <TableCell align="center">
        <EuroCurrency value={portfolio.value} />
      </TableCell>
      <TableCell align="center">
        <Performance value={portfolio.perf7d} />
      </TableCell>
      <TableCell align="center">
        <Performance value={portfolio.perf1y} />
      </TableCell>
      <TableCell align="center">
        <Tooltip title={t('portfolio.rename').toString()}>
          <div className={classes.action}>
            <IconButton
              onClick={(e) => {
                renamePortfolio(portfolio.id);
                e.stopPropagation();
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={t('portfolio.duplicate').toString()}>
          <div className={classes.action}>
            <IconButton
              onClick={(e) => {
                duplicatePortfolio(portfolio.id);
                e.stopPropagation();
              }}
            >
              <DuplicateIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip
          title={(portfolio.virtual
            ? t('portfolio.delete')
            : t('portfolio.deleteReal')
          ).toString()}
          // stop click event propagation here because the delete button can be disabled
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={classNames(
              classes.action,
              !portfolio.virtual && classes.disabled
            )}
          >
            <IconButton
              disabled={!portfolio.virtual}
              onClick={() => {
                deletePortfolio(portfolio.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export type DashboardTableProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const { t } = useTranslation();

  // TODO: Improve portfolio score visualization
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('portfolio.score')}</TableCell>
            <TableCell align="center">{t('portfolio.name')}</TableCell>
            <TableCell align="center">
              {t('portfolio.positionsCount')}
            </TableCell>
            <TableCell align="center">{t('portfolio.value')}</TableCell>
            <TableCell align="center">{t('portfolio.7d')}</TableCell>
            <TableCell align="center">{t('portfolio.1y')}</TableCell>
            <TableCell align="center">{t('portfolio.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolios.map((p) => (
            <DashboardTableRow
              portfolio={p}
              selectPortfolio={selectPortfolio}
              key={p.id}
              renamePortfolio={renamePortfolio}
              duplicatePortfolio={duplicatePortfolio}
              deletePortfolio={deletePortfolio}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
