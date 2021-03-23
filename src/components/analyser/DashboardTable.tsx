import React from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';
import EuroCurrency from './EuroCurrency';
import Performance from './Performance';

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
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
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
    </TableRow>
  );
};

export type DashboardTableProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
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
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolios.map((p) => (
            <DashboardTableRow
              portfolio={p}
              selectPortfolio={selectPortfolio}
              key={p.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;