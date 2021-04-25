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
import StyledNumberFormat from '../shared/StyledNumberFormat';
import ValueOverName from './ValueOverName';
import { Position } from '../../portfolio/APIClient';
import { stockDetails } from '../../portfolio/Router';
import LimitedString from './LimitedString';
import DetailsMainPositionsCard from './DetailsMainPositionsCard';
import ShowMoreAccordion from './ShowMoreAccordion';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    gridListWrapper: {
      width: '100%',
      margin: '0 -16px',
    },
    gridList: {
      width: '100%',
      height: 'auto',
      maxHeight: '50rem',
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

  return (
    <>
      <div className={classes.gridListWrapper}>
        <GridList
          cellHeight="auto"
          cols={4}
          spacing={32}
          className={classes.gridList}
          style={{ margin: '0 auto' }}
        >
          {positions.length <= 4 &&
            positions.map((p) => (
              <GridListTile key={p.stock.symbol}>
                <DetailsMainPositionsCard p={p} />
              </GridListTile>
            ))}
          {positions.length > 4 &&
            positions.slice(0, 4).map((p) => (
              <GridListTile key={p.stock.symbol}>
                <DetailsMainPositionsCard p={p} />
              </GridListTile>
            ))}
        </GridList>
      </div>
      {positions.length > 4 && (
        <div className={classes.gridListWrapper}>
          <ShowMoreAccordion
            positions={positions.slice(4, positions.length + 1)}
          />
        </div>
      )}
    </>
  );
};

export default DetailsMainPositions;
