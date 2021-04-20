import React from 'react';
import { makeStyles, Theme, darken, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import InfoButton from '../shared/InfoButton';

const useStyles = makeStyles(({ palette }: Theme) => ({
  box: {
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '0.25rem',
    borderRadius: '0.75rem',
    userSelect: 'none',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: '0.05rem',
  },
  subTitle: {
    fontSize: '0.9rem',
    fontWeight: 400,
    marginTop: '-0.25rem',
  },
  tooltip: {
    fontSize: '0.75rem',
  },
  darkRed: {
    backgroundColor: darken(palette.error.main, 0.2),
  },
  red: {
    backgroundColor: palette.error.main,
  },
  yellow: {
    backgroundColor: palette.warning.main,
  },
  green: {
    backgroundColor: palette.success.main,
  },
  darkGreen: {
    backgroundColor: darken(palette.success.main, 0.2),
  },
  scoreAndInfo: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

type PortfolioScoreProps = {
  dashboard?: boolean;
  score: number;
};

const PortfolioScore: React.FC<PortfolioScoreProps> = ({
  score,
  dashboard,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // a score is mapped to one of these 5 classes with colors
  const scoreClasses = [
    classes.darkRed,
    classes.red,
    classes.yellow,
    classes.green,
    classes.darkGreen,
  ];

  return (
    <div
      // TODO: change to Math.floor(score * 5) if score is from 0 to 1
      className={`${classes.box} ${scoreClasses[Math.floor(score * 0.05)]}`}
    >
      <Typography className={classes.title}>{Math.round(score)}</Typography>
      {/* Renders subTitle 'score' if in details page */}
      {!dashboard && (
        <div className={classes.scoreAndInfo}>
          <Typography className={classes.subTitle}>
            {t('portfolio.details.score')}
          </Typography>
          <InfoButton infotext={t('portfolio.details.scoreTooltip')} />
        </div>
      )}
    </div>
  );
};

export default PortfolioScore;
