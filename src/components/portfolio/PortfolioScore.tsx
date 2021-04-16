import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  darken,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }: Theme) => ({
  box: {
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 600,
    padding: '0.25rem 0',
    color: palette.secondary.contrastText,
    borderRadius: '0.75rem',
    userSelect: 'none',
  },
  tooltip: {
    fontSize: '0.75rem',
  },
}));

type PortfolioScoreType = {
  score: number;
};

const PortfolioScore: React.FC<PortfolioScoreType> = ({ score }) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const { t } = useTranslation();

  // a score is mapped to one of these 5 colors
  const scoreColors = [
    darken(palette.error.main, 0.2),
    palette.error.main,
    palette.warning.main,
    palette.success.main,
    darken(palette.success.main, 0.2),
  ];

  return (
    <Tooltip
      title={
        <p className={classes.tooltip}>
          {t('portfolio.details.scoreTooltip').toString()}
        </p>
      }
    >
      <Typography
        className={classes.box}
        style={
          // TODO: change to Math.floor(score * 5) if score is from 0 to 1
          {
            backgroundColor: scoreColors[Math.floor(score * 0.05)],
          }
        }
      >
        {score}
      </Typography>
    </Tooltip>
  );
};

export default PortfolioScore;
