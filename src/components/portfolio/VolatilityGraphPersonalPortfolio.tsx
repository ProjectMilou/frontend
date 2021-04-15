import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    linePortfolio: {
      height: '3rem',
      width: '0.25rem',
      'background-color': '#F6AE2D',
    },
    portfolioVolatility: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
    },
    linePortfolioText: {
      color: palette.primary.contrastText,
      marginTop: '0.5rem',
      transform: 'translate(-50%, 0%)',
    },
  })
);

type VolatilityGraphPersonalPortfolioProps = {
  portfolioVolatility: number;
};

const VolatilityGraphPersonalPortfolio: React.FC<VolatilityGraphPersonalPortfolioProps> = ({
  portfolioVolatility,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={classes.portfolioVolatility}
        style={{
          left: `${Math.round((portfolioVolatility / 2.0) * 1000) / 10}%`,
        }}
      >
        <div className={classes.linePortfolio} />
        <div className={classes.linePortfolioText}>
          {t('portfolio.details.analytics.volatility.myPortfolio')}
        </div>
      </div>
    </>
  );
};

export default VolatilityGraphPersonalPortfolio;
