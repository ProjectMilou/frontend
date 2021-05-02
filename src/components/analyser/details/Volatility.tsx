import React, { ReactElement } from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as API from '../../../analyser/APIClient';
import InfoButton from '../../shared/InfoButton';
import VolatilityGraph from '../../shared/VolatilityGraph';
import LargeVolatilityLineEntry from '../../shared/LargeVolatilityLineEntry';
import SubsectionDivider from '../../shared/SubsectionDivider';

// props type declaration
export type VolatilityProps = {
  details: API.StockDetails;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
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
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    redDot: {
      height: '20px',
      width: '20px',
      backgroundColor: palette.error.main,
      borderRadius: '50%',
      display: 'inline-block',
    },
    greenDot: {
      height: '20px',
      width: '20px',
      backgroundColor: palette.success.main,
      borderRadius: '50%',
      display: 'inline-block',
    },
  })
);

// type declarations
type InfoBlockProps = {
  title: string;
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
          <div className={classes.infoTitleP}>{title}</div>
          <InfoButton infotext={info}> </InfoButton>
        </Toolbar>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

const Volatility: React.FC<VolatilityProps> = ({ details }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const { palette } = useTheme();
  return (
    <>
      <SubsectionDivider subsection="analyser.details.Volatility" />
      <div className={classes.chartContainer}>
        <div className={classes.infoContainer}>
          <InfoBlock
            title={t('analyser.details.Volatility.BetaFactor')}
            info={t('analyser.details.Volatility.TreynorRatio')}
            body={
              <div style={{ margin: 0 }}>
                {' '}
                {details.beta != null
                  ? details.beta
                  : (details.symbol,
                    t(
                      'analyser.details.Volatility.BetaFactor.ErrorMessage'
                    ))}{' '}
              </div>
            }
          />
          <InfoBlock
            title={t('analyser.details.Volatility.SharpeRatio')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Volatility.SharpeRatio.infoButton')}
          />
          <InfoBlock
            title={t('analyser.details.Volatility.TreynorRatio')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Volatility.TreynorRatio.infoButton')}
          />
        </div>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Volatility.VolatilityChart')}
            <>&nbsp;</>
            <InfoButton
              infotext={t(
                'analyser.details.Volatility.VolatilityChart.infoButton'
              )}
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
              <VolatilityGraph color={palette.primary.main}>
                <LargeVolatilityLineEntry
                  volatilityValue={details.beta}
                  marketValue={1}
                  name={details.symbol}
                  textColor={
                    details.beta > 1
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                />
              </VolatilityGraph>
              <div className={classes.titleWrapper}>
                <h5 className={classes.boxTitles}>
                  Low:
                  <>&nbsp;&nbsp;</>
                  <span className={classes.greenDot} />
                  <>&emsp;&emsp;&emsp;</>
                  High:
                  <>&nbsp;&nbsp;</>
                  <span className={classes.redDot} />
                </h5>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};
export default Volatility;
