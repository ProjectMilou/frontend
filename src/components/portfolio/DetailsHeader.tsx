import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import DetailsEdit from './DetailsEdit';
import { Position, PositionQty } from '../../portfolio/APIClient';
import { portfolioDashboard } from '../../portfolio/Router';
import StyledNumberFormat from '../shared/StyledNumberFormat';

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
    value: {
      fontSize: '2.5rem',
      fontFamily: typography.fontFamily,
      whiteSpace: 'nowrap',
      marginTop: '-2rem',
    },
  })
);

export type DetailsHeaderProps = {
  id: string;
  name?: string;
  positions?: Position[];
  editPositions: (modifications: PositionQty[]) => Promise<void>;
  virtual?: boolean;
  value?: number;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  name,
  id,
  positions,
  editPositions,
  virtual,
  value,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
      {value && (
        <div className={classes.value}>
          {`${t('portfolio.details.totalValue')}: `}
          <StyledNumberFormat value={value} suffix="€" />
        </div>
      )}
      <DetailsEdit
        positions={positions}
        edit={editPositions}
        virtual={virtual}
        id={id}
        name={name}
      />
    </div>
  );
};

export default DetailsHeader;
