import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';
import { Position } from '../../portfolio/APIClient';
import DetailsMainPositionsCard from './DetailsMainPositionsCard';
import ShowMoreAccordion from './ShowMoreAccordion';

const useStyles = makeStyles(() =>
  createStyles({
    gridListWrapper: {
      width: '100%',
    },
    gridList: {
      width: '100%',
      height: 'auto',
    },
  })
);

type DetailsMainPositionsProps = {
  positions: Position[];
};

/**
 * This section renders all positions in a portfolio as cards.
 * It starts with 8 visible cards the rest are hidden behind a view more
 * at the bottom of the component.
 *
 * @param positions - The positions within a portfolio
 */

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
          {positions.length <= 8 &&
            positions.map((p) => (
              <GridListTile key={p.stock.symbol}>
                <DetailsMainPositionsCard p={p} />
              </GridListTile>
            ))}
          {positions.length > 8 &&
            positions.slice(0, 8).map((p) => (
              <GridListTile key={p.stock.symbol}>
                <DetailsMainPositionsCard p={p} />
              </GridListTile>
            ))}
        </GridList>
      </div>
      {positions.length > 8 && (
        <ShowMoreAccordion positions={positions.slice(8, positions.length)} />
      )}
    </>
  );
};

export default DetailsMainPositions;
