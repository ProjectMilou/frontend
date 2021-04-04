import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DetailsEdit from './DetailsEdit';
import { Position, PositionQty } from '../../portfolio/APIClient';

// stylesheet for the header of the details page
const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    topContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '95%',
      height: '100%',
      // TODO: use theme margin
      margin: '0 2rem',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    backButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    title: {
      // TODO: use theme font size
      fontSize: '2.5rem',
      fontFamily: typography.fontFamily,
      whiteSpace: 'nowrap',
    },
  })
);

// type declaration of the header components props
export type DetailsHeaderProps = {
  // function to return to the dashboard
  back: () => void;
  // name of the portfolio
  name?: string;
  // list of positions
  positions?: Position[];
  // function to save modifications to portfolio positions
  editPositions: (modifications: PositionQty[]) => Promise<void>;
};

// returns the details page header
const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  back,
  name,
  positions,
  editPositions,
}) => {
  const classes = useStyles();

  return (
    <div id="topContainer" className={classes.topContainer}>
      <div id="titleContainer" className={classes.titleContainer}>
        <div className={classes.backButtonContainer}>
          <IconButton
            aria-label="back"
            onClick={back}
            style={{ backgroundColor: 'transparent' }}
          >
            <ArrowBackIosIcon fontSize="large" />
          </IconButton>
        </div>
        <div>{name && <span className={classes.title}>{name}</span>}</div>
      </div>
      <DetailsEdit positions={positions} edit={editPositions} />
    </div>
  );
};

// exports
export default DetailsHeader;
