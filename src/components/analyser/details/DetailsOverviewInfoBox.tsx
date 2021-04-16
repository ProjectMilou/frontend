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

  const convertPerformanceToColor = (num: number) =>
    num <= 0 ? theme.palette.error.main : theme.palette.success.main;
  const convertToPercent = (num: number): string => `${num}%`;

  // Rounds and adds M=Million, B=Billion and K=Thousand --> American System!!!
  const moneyFormat = (val: number) => {
    let round = '';
    if (Math.abs(val) >= 1.0e9) {
      round = `${Math.round(Math.abs(val) / 1.0e9)} B`;
    } else if (Math.abs(val) >= 1.0e6) {
      round = `${Math.round(Math.abs(val) / 1.0e6)} M`;
    } else if (Math.abs(val) >= 1.0e3) {
      round = `${Math.round(Math.abs(val) / 1.0e3)} K`;
    } else {
      round = `${Math.abs(val)}`;
    }
    return round;
  };

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
            top={moneyFormat(parseInt(stockDetails.marketCapitalization, 10))}
            bottom={t('company.mc')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
            infoText={t('info.mc')}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={parseFloat(stockDetails.per50DayMovingAverage)
              .toFixed(2)
              .toString()}
            bottom={t('stock.50dayMovingAverage')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
            infoText={t('info.50dayMovingAverage')}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextOverText
            top={stockDetails.sharesFloat}
            bottom={t('company.sharesFloat')}
            colorTop={theme.palette.primary.main}
            colorBottom={theme.palette.primary.light}
            infoText={t('info.sharesFloat')}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          {/* dividend */}
          <TextOverText
            top={convertToPercent(stockOverview.div)}
            bottom={t('stock.div')}
            colorTop={convertPerformanceToColor(stockOverview.div)}
            colorBottom={theme.palette.primary.light}
          />
        </TableCell>
      </TableRow>
    </Table>
  );
};

export default DetailsOverviewInfoBox;
