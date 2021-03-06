import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import ValueOverName from './ValueOverName';
import { stockDetails } from '../../portfolio/Router';
import { Position } from '../../portfolio/APIClient';
import LimitedString from './LimitedString';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    button: {
      textTransform: 'none',
      color: palette.primary.contrastText,
      padding: 0,
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.primary.main,
      padding: '0 8px',
    },
    cardContent: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      marginBottom: 'auto',
      color: palette.primary.contrastText,
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    cardSubtitle: {
      color: palette.primary.contrastText,
      fontSize: '1rem',
      fontWeight: 500,
      marginTop: '10px',
    },
    cardContentLower: {
      display: 'flex',
      justifyContent: 'space-around',
      height: '5rem',
      marginTop: '1rem',
    },
    cardAction: {
      padding: '16px',
    },
    missingData: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.primary.contrastText,
      height: '5rem',
      marginTop: '1rem',
    },
  })
);

type DetailsMainPositionsCardProps = {
  p: Position;
};

/**
 * A singular position card that displays name, how much is being held in euro,
 * how many of this stock is in the portfolio, the price of the stock
 * along with the 7 day, 1 year and total return values.
 * The bottom of the card features a 'view more' button that takes you to
 * the respective analyzer page.
 *
 * @param p - The position (stock) to be displayed in card form
 */

const DetailsMainPositionsCard: React.FC<DetailsMainPositionsCardProps> = ({
  p,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  // takes a percent value and converts it to a color
  function convertPercentToColor(val: number): string {
    return val < 0 ? theme.palette.error.main : theme.palette.success.main;
  }

  return (
    <Card
      variant="outlined"
      className={classes.card}
      style={{
        borderColor: convertPercentToColor(p.totalReturnPercent),
      }}
    >
      <CardContent className={classes.cardContent}>
        <div className={classes.cardTitle}>
          <LimitedString value={p.stock.name} />
        </div>
        <div>
          <div className={classes.cardSubtitle}>
            <span>{`${t('portfolio.details.holding')}: `}</span>
            <StyledNumberFormat
              value={p.stock.price * p.qty}
              suffix="€"
              doLimit
            />
            <br />
            <span>{`${t('portfolio.details.amount')}: `}</span>
            <LimitedString value={p.qty.toString()} />
            <br />
            <span>{`${t('portfolio.details.perShare')}: `}</span>
            <StyledNumberFormat value={p.stock.price} suffix="€" />
          </div>
        </div>
        {/* if the stock is missing data leave out performance values */}
        {p.stock.missingData ? (
          <span className={classes.missingData}>
            {t('portfolio.details.missingPerformance')}
          </span>
        ) : (
          <div className={classes.cardContentLower}>
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={p.stock.perf7dPercent}
                  suffix="%"
                  paintJob
                  doLimit
                />
              }
              name={t('portfolio.details.day7')}
              secondValue={
                <StyledNumberFormat
                  value={p.stock.perf7d}
                  suffix="€"
                  paintJob
                  doLimit
                />
              }
            />
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={p.stock.perf1yPercent}
                  suffix="%"
                  paintJob
                  doLimit
                />
              }
              name={t('portfolio.details.year')}
              secondValue={
                <StyledNumberFormat
                  value={p.stock.perf1y}
                  suffix="€"
                  paintJob
                  doLimit
                />
              }
            />
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={p.totalReturnPercent}
                  suffix="%"
                  paintJob
                  doLimit
                />
              }
              name={t('portfolio.details.totalReturn')}
              secondValue={
                <StyledNumberFormat
                  value={p.totalReturn}
                  suffix="€"
                  paintJob
                  doLimit
                />
              }
            />
          </div>
        )}
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          size="small"
          endIcon={
            <ArrowRightIcon
              style={{ marginLeft: '-8px', marginTop: '4px' }}
              aria-label="rightArrow"
            />
          }
          className={classes.button}
          style={{ backgroundColor: 'transparent' }}
          onClick={() => stockDetails(p.stock.symbol)}
        >
          {t('portfolio.details.viewMore')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailsMainPositionsCard;
