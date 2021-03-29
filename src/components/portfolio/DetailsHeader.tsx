import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DetailsEdit from './DetailsEdit';
import AddToPortfolioButton from './AddToPortfolioButton';
import { Position } from './DetailsTypes';

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
  name: string;
  // list of positions
  positions: Position[];
};

// returns the details page header
const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  back,
  name,
  positions,
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
        <div>
          <p className={classes.title}>{name}</p>
        </div>
      </div>
      <DetailsEdit positions={positions} />
      <AddToPortfolioButton />
    </div>
  );
};

// exports
export default DetailsHeader;
