import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  GridList,
  GridListTile,
  Button,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTranslation } from 'react-i18next';
import { Position } from './DetailsTypes';
import EuroCurrency from '../shared/EuroCurrency';
import Performance from '../shared/Performance';
import ValueOverName from './ValueOverName';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    button: {
      textTransform: 'none',
      // TODO: use theme color
      color: '#EEF1FB',
      padding: 0,
    },
    gridListWrapper: {
      width: '100%',
      margin: '0 -16px',
    },
    gridList: {
      width: '100%',
      height: 'auto',
      maxHeight: '50rem',
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
      // TODO: use theme color
      color: '#EEF1FB',
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

type DetailsMainPositionsProps = {
  positions: Position[];
};

// TODO delete mock and replace with value from refactored props object in map statement
const totalValuePosition = 362.42;
const totalReturnPerCent = 18;
const totalReturnAbsolute = 78.67;
const sevDayAbsolute = -8.1;
const oneYearAbsolute = 35.6;

const DetailsMainPositions: React.FC<DetailsMainPositionsProps> = ({
  positions,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: no hard coded colors
  // takes a percent value and converts it to a color
  function convertPercentToColor(val: number): string {
    return val < 0 ? '#D64745' : '#50E2A8';
  }

  return (
    <div className={classes.gridListWrapper}>
      <GridList
        cellHeight="auto"
        cols={4}
        spacing={32}
        className={classes.gridList}
        style={{ margin: '0 auto' }}
      >
        {positions.map((p) => (
          <GridListTile key={p.stock.isin}>
            <Card
              variant="outlined"
              className={classes.card}
              style={{ borderColor: convertPercentToColor(totalReturnPerCent) }}
            >
              {/* TODO replace mock primary and secondary value and color with correct values from props */}
              <CardContent>
                <div className={classes.cardContentUpper}>
                  <div className={classes.cardTitle}>{p.stock.name}</div>
                  <div className={classes.cardSubtitle}>
                    <span>{`${t('portfolio.details.holding')}: `}</span>
                    <EuroCurrency value={totalValuePosition} size="1em" />
                  </div>
                </div>
                <div className={classes.cardContentLower}>
                  <ValueOverName
                    value={<Performance value={p.stock.perf7d} size="1em" />}
                    name={t('portfolio.details.day7')}
                    valueColor={convertPercentToColor(p.stock.perf7d)}
                    secondValue={
                      <EuroCurrency value={sevDayAbsolute} size="1em" />
                    }
                    secondColor={convertPercentToColor(sevDayAbsolute)}
                  />
                  <ValueOverName
                    value={<Performance value={p.stock.perf1y} size="1em" />}
                    name={t('portfolio.details.year')}
                    valueColor={convertPercentToColor(p.stock.perf1y)}
                    secondValue={
                      <EuroCurrency value={oneYearAbsolute} size="1em" />
                    }
                    secondColor={convertPercentToColor(oneYearAbsolute)}
                  />
                  <ValueOverName
                    value={
                      <Performance value={totalReturnPerCent} size="1em" />
                    }
                    name={t('portfolio.details.totalReturn')}
                    valueColor={convertPercentToColor(totalReturnPerCent)}
                    secondValue={
                      <EuroCurrency value={totalReturnAbsolute} size="1em" />
                    }
                    secondColor={convertPercentToColor(totalReturnAbsolute)}
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
                  // TODO: handle button click
                  onClick={() => null}
                >
                  {t('portfolio.details.viewMore')}
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default DetailsMainPositions;
