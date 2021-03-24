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
import * as API from '../../analyser/APIClient';
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
  stock: API.Stock;
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  stock
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  const selectStock = (symbol: API.Stock['symbol']) => {
    console.log(symbol)
  }

  return (
    <TableRow
      onClick={() => {
        selectStock(stock.symbol);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center">{stock.name}</TableCell>
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={<Typography color="primary">{stock.symbol}</Typography>}
          secondary={
           stock['1d'] > 0 ? t('portfolio.virtual') : t('portfolio.real')
          }
          secondaryTypographyProps={{
            color: stock['1d'] > 0 ? 'textSecondary' : 'secondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.positionCount}>
        {stock.analystTargetPrice}
      </TableCell>
      <TableCell align="center">
        <EuroCurrency value={stock.valuation} />
      </TableCell>
      <TableCell align="center">
        <Performance value={stock['7d']} />
      </TableCell>
      <TableCell align="center">
        <Performance value={stock['30d']} />
      </TableCell>
    </TableRow>
  );
};

export type DashboardTableProps = {
  stocks: API.Stock[];
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  stocks
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
          {stocks.map((s) => (
            <DashboardTableRow
              stock={s}
              key={s.symbol}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
