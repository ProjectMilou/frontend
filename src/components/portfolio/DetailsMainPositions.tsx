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

// stylesheet for the positions section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: palette.primary.contrastText,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: '#EEF1FB',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
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

// type declarations
type DetailsMainPositionsProps = {
  positions: Position[];
};

// returns the details page header
const DetailsMainPositions: React.FC<DetailsMainPositionsProps> = ({
  positions,
}) => {
  const [posState] = React.useState(positions);
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: no hard coded colors
  // takes a percent value and converts it to a color
  function convertPercentToColor(val: number): string {
    return val < 0 ? '#D64745' : '#50E2A8';
  }

  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>
            {t('portfolio.details.positionsTitle')}
          </h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <div className={classes.gridListWrapper}>
        <GridList
          cellHeight="auto"
          cols={4}
          spacing={32}
          className={classes.gridList}
          style={{ margin: '0 auto' }}
        >
          {posState.map((p) => (
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
    </div>
  );
};

export default DetailsMainPositions;
