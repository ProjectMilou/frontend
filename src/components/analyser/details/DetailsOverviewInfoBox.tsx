import React from 'react';
import {
  useTheme,
  makeStyles,
  createStyles,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import TextOverText from '../../shared/TextOverText';
import { moneyFormat, convertToPercent, convertPercentToColor } from '../../../analyser/Helper';

// stylesheet for the Summary section
const useStyles = makeStyles(() =>
  createStyles({
    infoBox: {
      // optional outline
      // outlineStyle: 'solid',
      outlineColor: 'ba',
      outlineWidth: '0.15rem',
      margin: '1rem 0',
      border: 'none',
    },
    tableCell: {
      border: 'none',
    },
  })
);

// type declarations
type DetailsOverviewProps = {
  // overview of stock
  stockOverview: Stock;
  // details of stock
  stockDetails: StockDetails;
};

const DetailsOverviewInfoBox: React.FC<DetailsOverviewProps> = ({
  stockOverview,
  stockDetails,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Table className={classes.infoBox}>
      <TableRow>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${stockOverview.country}`}
            bottom={t('stock.country')}
            colorTop={theme.palette.lightBlue.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>

        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${stockOverview.currency}`}
            bottom={t('stock.currency')}
            colorTop={theme.palette.lightBlue.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>

        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${stockOverview.industry}`}
            bottom={t('stock.industry')}
            colorTop={theme.palette.lightBlue.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={stockDetails.exchange}
            bottom={t('company.exchange')}
            colorTop={theme.palette.lightBlue.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${moneyFormat(
              parseInt(stockDetails.marketCapitalization, 10)
            )}€`}
            bottom={t('company.mc')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
            infoText={t('info.mc')}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${parseFloat(stockDetails.per52WeekLow)
              .toFixed(2)
              .toString()}€`}
            bottom={t('stock.per52WeekLow')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={`${parseFloat(stockDetails.per52WeekHigh)
              .toFixed(2)
              .toString()}€`}
            bottom={t('company.per52WeekHigh')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          {/* dividend */}
          <TextOverText
            top={convertToPercent(stockOverview.div)}
            bottom={t('stock.div')}
            colorTop={convertPercentToColor(stockOverview.div)}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
      </TableRow>
    </Table>
  );
};

export default DetailsOverviewInfoBox;
