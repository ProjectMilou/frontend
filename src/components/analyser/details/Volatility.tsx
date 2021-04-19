import React, { ReactElement } from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as API from '../../../analyser/APIClient';
import VolatilityLineEntry from '../../portfolio/VolatilityLineEntry';
import VolatilityGraphMarketAvg from '../../portfolio/VolatilityGraphMarketAvg';
import InfoButton from '../../shared/InfoButton';

// props type declaration
export type DetailsProps = {
  details: API.StockDetails;
  risks: API.RiskList;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    lineVolatility: {
      width: '90%',
      height: '3px',
      margin: 'auto',
      'background-color': palette.primary.dark,
      position: 'relative',
      display: 'flex',
    },
    wrapper: {
      height: '250px',
    },
    lineChartWrapper: {
      float: 'right',
      flexBasis: '70%',
      padding: '1rem',
    },
    infoContainer: {
      height: '100%',
      flexBasis: '30%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'left',
      padding: '2rem',
      float: 'left',
    },
    infoWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoBody: {
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.main,
      fontWeight: typography.fontWeightRegular,
      fontSize: '1.15rem',
    },
    infoTitle: {
      color: palette.primary.main,
      fontWeight: typography.fontWeightBold,
      fontSize: '1.25rem',
      margin: 0,
      whiteSpace: 'nowrap',
    },
    infoTitleP: {
      margin: '0.5rem 0.5rem',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    title: {
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.dark,
      fontWeight: typography.fontWeightRegular,
      fontSize: '1.2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
  })
);

// type declarations
type InfoBlockProps = {
  title: string;
  info: string;
  body: ReactElement;
  info: string;
};

// returns the details page header
const InfoBlock: React.FC<InfoBlockProps> = ({ title, body, info }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <Toolbar disableGutters>
          <p className={classes.infoTitleP}>{title}</p>
          <InfoButton infotext={info}> </InfoButton>
        </Toolbar>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

const Volatility: React.FC<DetailsProps> = ({ details, risks }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const vol = risks.success.volatility;
  const market = risks.success.averageMarketVolatility;

  return (
    <div>
      <div className={classes.chartContainer}>
        <div className={classes.infoContainer}>
          <InfoBlock
            title={t('analyser.details.Volatility.BetaFactor')}
            info={t('analyser.details.Volatility.TreynorRatio')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {details.beta != null
                  ? details.beta
                  : (details.symbol, " doesn't share beta factor.")}{' '}
              </p>
            }
          />
          <InfoBlock
            title={t('analyser.details.Volatility.SharpeRatio')}
            info={t('analyser.details.Volatility.TreynorRatio')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Volatility.SharpeRatio.infoButton')}
          />
          <InfoBlock
            title={t('analyser.details.Volatility.TreynorRatio')}
            info={t('analyser.details.Volatility.TreynorRatio')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Volatility.TreynorRatio.infoButton')}
          />
        </div>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Volatility.VolatilityChart')}
            <>&nbsp;</>
            <InfoButton
              infotext={t('analyser.details.Volatility.VolatilityChart')}
            />
          </div>
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.wrapper}
            >
              Low
              <div className={classes.lineVolatility}>
                <VolatilityGraphMarketAvg />
                <VolatilityLineEntry
                  volatilityValue={vol}
                  tooltipText={details.symbol}
                  color={
                    vol > market
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                />
                <VolatilityLineEntry
                  volatilityValue={market}
                  tooltipText="Industry"
                  color={theme.palette.success.main}
                />
              </div>
              High
            </Grid>
          </div>
          <div className={classes.infoBody}>
            <p>
              {t('analyser.details.Volatility.CompanyShare')}
              {': '}
              {Math.round(risks.success.averageMarketVolatility * 100) / 100}
            </p>
            <>&nbsp;</>
            <InfoButton
              infotext={t('analyser.details.Volatility.CompanyShare')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Volatility;
