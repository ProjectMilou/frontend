// Based on Portfolio's DashboardTable.tsx Will be later either replaced by Material-UI list or refactored

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
  createStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../../analyser/APIClient';
import EuroCurrency from '../../shared/EuroCurrency';
import Performance from '../../shared/Performance';
import Valuation from '../../shared/Valuation';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    action: { display: 'inline-block' },
    row: {
      cursor: 'pointer',
    },
    rowHover: {
      backgroundColor: lighten(palette.primary.light, 0.85),
    },
    defaultText: {
      fontSize: '24px',
      color: palette.primary.main,
    },
    disabled: {
      cursor: 'not-allowed',
    },
  })
);

export type DashboardTableRowProps = {
  stock: API.Stock;
  selectStock: (id: string) => void;
};

// Rounds and adds M=Million, B=Billion and K=Thousand --> American System!!!
function moneyFormat(val: number): string {
  let round = '';
  if (Math.abs(val) >= 1.0e9) {
    round = `€${Math.round(Math.abs(val) / 1.0e9)}B`;
  } else if (Math.abs(val) >= 1.0e6) {
    round = `€${Math.round(Math.abs(val) / 1.0e6)}M`;
  } else if (Math.abs(val) >= 1.0e3) {
    round = `€${Math.round(Math.abs(val) / 1.0e3)}K`;
  } else {
    round = `€${Math.abs(val)}`;
  }
  return round;
}

// Numbers are output in different colors need clear approach!
export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  stock,
  selectStock,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

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
          primary={
            <Typography className={classes.defaultText} color="primary">
              {stock.symbol}
            </Typography>
          }
          secondary={stock.name}
          secondaryTypographyProps={{
            color: 'textSecondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <EuroCurrency
          value={stock.price}
          decimalSeperator="."
          thousandSeperator=","
        />
      </TableCell>
      <TableCell align="center">
        <Performance
          value={stock.per7d}
          decimalSeperator="."
          thousandSeperator=","
        />
      </TableCell>
      <TableCell align="center">
        <Performance
          value={stock.per30d}
          decimalSeperator="."
          thousandSeperator=","
        />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.defaultText}>
          {moneyFormat(stock.marketCapitalization)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <EuroCurrency
          value={stock.analystTargetPrice}
          decimalSeperator="."
          thousandSeperator=","
        />
      </TableCell>
      <TableCell align="center">
        <Valuation value={stock.valuation} />
      </TableCell>
      <TableCell align="center">
        <Performance
          value={stock.div}
          decimalSeperator="."
          thousandSeperator=","
        />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.defaultText}>
          {t(`${stock.industry}`)}
        </Typography>
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
    <TableContainer component={Paper}>
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
