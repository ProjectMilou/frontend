import React from 'react';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import {
  lighten,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  Typography,
  createStyles,
  useTheme,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../../analyser/APIClient';
import StyledNumberFormat from '../../shared/StyledNumberFormat';
import Valuation from '../../shared/Valuation';
import TextOverText from '../../shared/TextOverText';
import { moneyFormat } from '../../../analyser/Helper';

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
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    highlightText: {
      fontSize: '1rem',
      fontWeight: 600,
      color: palette.lightBlue.main,
    },
  })
);

type DashboardTableRowProps = {
  stock: API.Stock;
};

/**
 * This component displays the actual data of individual stocks in the rows of the table
 *
 * @param stock single stock overview to display in a row
 */
const DashboardTableRow: React.FC<DashboardTableRowProps> = ({ stock }) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <TableRow
      onClick={() => navigate(`analyser/${stock.symbol}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell component="th" scope="row">
        <TextOverText
          top={`${stock.symbol}`}
          bottom={`${stock.name}`}
          colorTop={theme.palette.grey[700]}
          colorBottom={theme.palette.lightBlue.main}
          sizeBottom="1rem"
          alignment="left"
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat
          value={stock.price}
          suffix="€"
          paintJob={theme.palette.primary.main}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat value={stock.per7d} suffix="%" paintJob />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat value={stock.per365d} suffix="%" paintJob />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.defaultText}>
          €{moneyFormat(stock.marketCapitalization)}
        </Typography>
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat
          value={stock.analystTargetPrice}
          suffix="€"
          paintJob={theme.palette.primary.main}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <Valuation value={stock.valuation} size="1.3rem" />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat value={stock.div} suffix="%" paintJob />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.highlightText}>
          {t(`${stock.industry}`)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default DashboardTableRow;
