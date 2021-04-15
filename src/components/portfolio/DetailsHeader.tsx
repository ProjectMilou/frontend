import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DetailsEdit from './DetailsEdit';
import { Position, PositionQty } from '../../portfolio/APIClient';
import { portfolioDashboard } from '../../portfolio/Router';

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
  id: string;
  // name of the portfolio
  name?: string;
  // list of positions
  positions?: Position[];
  // function to save modifications to portfolio positions
  editPositions: (modifications: PositionQty[]) => Promise<void>;
  // disables the Edit button if the portfolio is real
  virtual: boolean;
};

// returns the details page header
const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  name,
  id,
  positions,
  editPositions,
  virtual,
}) => {
  const classes = useStyles();

  return (
    <div id="topContainer" className={classes.topContainer}>
      <div id="titleContainer" className={classes.titleContainer}>
        <div className={classes.backButtonContainer}>
          <IconButton
            aria-label="back"
            onClick={() => portfolioDashboard()}
            style={{ backgroundColor: 'transparent' }}
          >
            <ArrowBackIosIcon fontSize="large" />
          </IconButton>
        </div>
        <div>{name && <span className={classes.title}>{name}</span>}</div>
      </div>
      <DetailsEdit
        positions={positions}
        edit={editPositions}
        virtual={virtual}
        id={id}
      />
    </div>
  );
};

export default DetailsHeader;
