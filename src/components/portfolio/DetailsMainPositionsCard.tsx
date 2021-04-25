import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  GridListTile,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import ValueOverName from './ValueOverName';
import { stockDetails } from '../../portfolio/Router';
import { Position } from '../../portfolio/APIClient';
import LimitedString from './LimitedString';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    button: {
      textTransform: 'none',
      color: palette.primary.contrastText,
      padding: 0,
    },
    card: {
      backgroundColor: palette.primary.main,
      padding: '0 8px',
    },
    cardContentUpper: {
      marginBottom: '2rem',
    },
    cardTitle: {
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
    },
    cardAction: {
      padding: '16px',
    },
  })
);

type DetailsMainPositionsCardProps = {
  p: Position;
};

// TODO delete mock and replace with value from refactored props object in map statement
const sevDayAbsolute = -8.1;
const oneYearAbsolute = 35.6;

const DetailsMainPositionsCard: React.FC<DetailsMainPositionsCardProps> = ({
  p,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: no hard coded colors
  // takes a percent value and converts it to a color
  function convertPercentToColor(val: number): string {
    return val < 0 ? '#D64745' : '#50E2A8';
  }

  return (
    <Card
      variant="outlined"
      className={classes.card}
      style={{
        borderColor: convertPercentToColor(p.totalReturnPercent),
      }}
    >
      {/* TODO replace mock primary and secondary value and color with correct values from props */}
      <CardContent>
        <div className={classes.cardContentUpper}>
          <div className={classes.cardTitle}>
            <LimitedString value={p.stock.name} />
          </div>
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
        <div className={classes.cardContentLower}>
          <ValueOverName
            value={
              <StyledNumberFormat value={p.stock.perf7d} suffix="%" paintJob />
            }
            name={t('portfolio.details.day7')}
            secondValue={
              <StyledNumberFormat
                value={sevDayAbsolute}
                suffix="€"
                paintJob
                doLimit
              />
            }
          />
          <ValueOverName
            value={
              <StyledNumberFormat value={p.stock.perf1y} suffix="%" paintJob />
            }
            name={t('portfolio.details.year')}
            secondValue={
              <StyledNumberFormat
                value={oneYearAbsolute}
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
