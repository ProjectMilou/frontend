import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { lighten } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DetailsEdit from './DetailsEdit';
import { Position, PositionQty } from '../../portfolio/APIClient';
import { portfolioDashboard } from '../../portfolio/Router';
import DuplicateDialog from './DuplicateDialog';
import * as API from '../../portfolio/APIClient';

// stylesheet for the header of the details page
const useStyles = makeStyles(({ typography, palette }: Theme) =>
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
    duplicateButton: {
      position: 'absolute',
      left: '6rem',
      padding: '0.25rem 1rem',
      backgroundColor: palette.lightBlue.main,
      '&:hover': {
        backgroundColor: lighten(palette.lightBlue.main, 0.35),
      },
      whiteSpace: 'nowrap',
    },
    subContainer: {
      height: '50%',
      display: 'flex',
      flexDirection: 'row',
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
  const { t } = useTranslation();
  const [openDuplicate, setOpenDuplicate] = React.useState<boolean>(false);

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
      <div className={classes.subContainer}>
        <DetailsEdit
          positions={positions}
          edit={editPositions}
          virtual={virtual}
        />
        <Button
          variant="contained"
          className={classes.duplicateButton}
          onClick={() => setOpenDuplicate(true)}
        >
          {t('portfolio.dialog.duplicate.title')}
        </Button>
      </div>
      {/* adapted from Dashboard.tsx */}
      {/* TODO use real name */}
      <DuplicateDialog
        initialName="CHANGE TO REAL NAME"
        open={openDuplicate}
        handleClose={() => setOpenDuplicate(false)}
        duplicate={async (newName) => {
          if (id) {
            const newId = await API.duplicate(id, newName);
            // TODO update list of portfolios in dashboard?
          }
        }}
      />
    </div>
  );
};

// exports
export default DetailsHeader;
