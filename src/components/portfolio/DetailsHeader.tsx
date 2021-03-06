import React from 'react';
import { IconButton, makeStyles, createStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import DetailsEdit from './DetailsEdit';
import { Position, PositionQty } from '../../portfolio/APIClient';
import { portfolioDashboard } from '../../portfolio/Router';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import LimitedString from './LimitedString';

const useStyles = makeStyles(() =>
  createStyles({
    topContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '95%',
      height: '100%',
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
      fontSize: '2.5rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    value: {
      fontSize: '2.5rem',
      whiteSpace: 'nowrap',
      marginTop: '-2rem',
      marginLeft: '3.5rem',
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
  loading?: boolean;
  error?: Error;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  name,
  id,
  positions,
  editPositions,
  virtual,
  value,
  loading,
  error,
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
        <div className={classes.title}>
          {name && <LimitedString value={name} length={60} />}
        </div>
      </div>
      {!!value && (
        <div className={classes.value}>
          {`${t('portfolio.details.totalValue')}: `}
          <StyledNumberFormat value={value} suffix="€" />
        </div>
      )}
      {!loading && !error && (
        <DetailsEdit
          positions={positions}
          edit={editPositions}
          virtual={virtual}
          id={id}
          name={name}
        />
      )}
    </div>
  );
};

export default DetailsHeader;
