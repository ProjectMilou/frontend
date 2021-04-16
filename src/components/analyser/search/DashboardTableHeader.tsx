import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  createStyles,
} from '@material-ui/core';
import * as API from '../../../analyser/APIClient';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    customTableHead: {
      backgroundColor: 'white',
      color: palette.primary.main,
      borderBottom: '1px solid black',
    },
  })
);

type Order = 'asc' | 'desc';

export type DashboardTableHeaderProps = {
  onRequestSort: (property: keyof API.Stock) => void;
  order: Order;
  orderByKey: keyof API.Stock;
};

interface HeadCell {
  id: keyof API.Stock;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

//   function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }

//   function sortStocks(
//     items: API.Stock[],
//     order: Order,
//     orderBy: keyof API.Stock
//   ) {
//     return order === 'desc'
//       ? items.sort((a, b) => descendingComparator(a, b, orderBy))
//       : items.sort((a, b) => -descendingComparator(a, b, orderBy));
//   }

const DashboardTableHeader: React.FC<DashboardTableHeaderProps> = ({
  onRequestSort,
  order,
  orderByKey,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const headCells: HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: t('stock.name'),
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: t('stock.lastPrice'),
    },
    { id: 'per7d', numeric: true, disablePadding: false, label: t('stock.7d') },
    {
      id: 'per365d',
      numeric: true,
      disablePadding: false,
      label: t('stock.365d'),
    },
    {
      id: 'marketCapitalization',
      numeric: true,
      disablePadding: false,
      label: t('stock.marketCap'),
    },
    {
      id: 'analystTargetPrice',
      numeric: true,
      disablePadding: false,
      label: t('stock.analystsTarget'),
    },
    {
      id: 'valuation',
      numeric: true,
      disablePadding: false,
      label: t('stock.valuation'),
    },
    { id: 'div', numeric: true, disablePadding: false, label: t('stock.div') },
    {
      id: 'industry',
      numeric: false,
      disablePadding: false,
      label: t('stock.industry'),
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((hc) => (
          <TableCell
            key={hc.id}
            align="center"
            classes={{ root: classes.customTableHead }}
            sortDirection={orderByKey === hc.id ? order : false}
          >
            <TableSortLabel
              active={orderByKey === hc.id}
              direction={orderByKey === hc.id ? order : 'asc'}
              onClick={() => onRequestSort(hc.id)}
            >
              {hc.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DashboardTableHeader;
