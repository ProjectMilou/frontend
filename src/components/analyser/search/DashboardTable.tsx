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
import * as API from '../../../analyser/APIClient';
import EuroCurrency from '../EuroCurrency';
import Performance from '../Performance';
import Valuation from '../Valuation'

const useStyles = makeStyles((theme: Theme) => ({
  action: { display: 'inline-block' },
  row: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
  },
  defaultText: {
    fontSize: '24px',
  },
  disabled: {
    cursor: 'not-allowed',
  },
}));

export type DashboardTableRowProps = {
  stock: API.Stock;
  selectStock: (id: string) => void;
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  stock,
  selectStock,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  // const selectedStock = (symbol: API.Stock['symbol']) => {
    
  //   // TODO: implement route to analyser page
  //   /* eslint no-console: ["error", { allow: ["warn", "error] }] */
  //   console.warn(symbol)
    
  // }

  return (
    <TableRow
      onClick={() => {
        selectStock(stock.symbol);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={<Typography className={classes.defaultText} color="primary">{stock.symbol}</Typography>}
          secondary={stock.name}
          secondaryTypographyProps={{
            color: 'textSecondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <EuroCurrency value={stock.price} />
      </TableCell>
      <TableCell align="center">
        <Performance value={stock['7d']} />
      </TableCell>
      <TableCell align="center">
        <Performance value={stock['30d']} />
      </TableCell>
      <TableCell align="center">
        <EuroCurrency value={stock.marketCapitalization} />
      </TableCell>
      <TableCell align="center">
        <EuroCurrency value={stock.analystTargetPrice} />
      </TableCell>
      <TableCell align="center">
        <Valuation value={stock.valuation} />
      </TableCell>
      <TableCell align="center" >
        <Typography color="primary" className={classes.defaultText}>{stock.growth}</Typography>
      </TableCell>
      <TableCell align="center">
        <Performance value={stock.div} />
      </TableCell>
      <TableCell align="center" >
        <Typography color="primary" className={classes.defaultText}>{t(`${stock.industry}`)}</Typography>
      </TableCell>
    </TableRow>
  );
};

export type DashboardTableProps = {
  stocks: API.Stock[];
  selectStock: (symbol: string) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  stocks,
  selectStock,
}) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('stock.name')}</TableCell>
            <TableCell align="center">{t('stock.lastPrice')}</TableCell>
            <TableCell align="center">{t('stock.7d')}</TableCell>
            <TableCell align="center">{t('stock.30d')}</TableCell>
            <TableCell align="center">{t('stock.marketCap')}</TableCell>
            <TableCell align="center">{t('stock.analystsTarget')}</TableCell>
            <TableCell align="center">{t('stock.valuation')}</TableCell>
            <TableCell align="center">{t('stock.growth')}</TableCell>
            <TableCell align="center">{t('stock.div')}</TableCell>
            <TableCell align="center">{t('stock.industry')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((s) => (
            <DashboardTableRow
              stock={s}
              selectStock={selectStock}
              key={s.symbol}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
