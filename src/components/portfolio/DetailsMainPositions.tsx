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
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    cardSubtitle: {
      // TODO: use theme color
      color: '#EEF1FB',
      fontSize: '1rem',
      fontWeight: 500,
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
              style={{ borderColor: convertPercentToColor(p.stock.perf7d) }}
            >
              <CardContent>
                <div className={classes.cardContentUpper}>
                  <div className={classes.cardTitle}>{p.stock.name}</div>
                  <div
                    className={classes.cardSubtitle}
                  >{`$${p.stock.price}`}</div>
                </div>
                <div className={classes.cardContentLower}>
                  <ValueOverName
                    value={`${p.stock.perf7d}%`}
                    name={t('portfolio.details.day7')}
                    valueColor={convertPercentToColor(p.stock.perf7d)}
                  />
                  <ValueOverName
                    value={`${p.stock.perf1y}%`}
                    name={t('portfolio.details.year')}
                    valueColor={convertPercentToColor(p.stock.perf1y)}
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
