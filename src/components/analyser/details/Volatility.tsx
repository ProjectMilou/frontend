import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import * as API from '../../../analyser/APIClient';

// props type declaration
export type DetailsProps = {
  details: API.StockDetails;
  risks: API.RiskList;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
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
      margin: '0.5rem 0',
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
      fontWeight: typography.fontWeightBold,
      fontSize: '0.8rem',
    },
  })
);

// type declarations
type InfoBlockProps = {
  title: string;
  body: ReactElement;
};

// returns the details page header
const InfoBlock: React.FC<InfoBlockProps> = ({ title, body }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <p className={classes.infoTitleP}>{title}</p>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

const Volatility: React.FC<DetailsProps> = ({ details, risks }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const options = {
    colors: ['#00e396', '#008ffb'],
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    labels: [2016, 2017, 2018, 2019, 2020],
    xaxis: {
      type: 'year',
      tickAmount: 6,
      labels: {
        style: {
          colors: 'grey',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'grey',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [10, 100],
      },
    },
    noData: {
      text: 'Loading...',
    },
  };

  const volatileSeries: number[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num =
      Math.round((risks.success.volatility + 0.1 * index) * 100) / 100;
    volatileSeries.push(num);
  }

  // risks.success.forEach((element) => {
  //   volatileSeries.push(element.volatility);
  // });

  const marketSeries: number[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num =
      Math.round((risks.success.averageMarketVolatility - 0.15 * index) * 100) /
      100;
    marketSeries.push(num);
  }
  // risks.success.forEach((element) => {
  //   marketSeries.push(element.averageMarketVolatility);
  // });

  return (
    <div>
      <div className={classes.chartContainer}>
        <div className={classes.infoContainer}>
          <InfoBlock
            title={t('analyser.details.Volatility.BetaFactor')}
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
            body={<p style={{ margin: 0 }}> 0.5 </p>}
          />
          <InfoBlock
            title={t('analyser.details.Volatility.TreynorRatio')}
            body={<p style={{ margin: 0 }}>0.5</p>}
          />
          <div className={classes.infoBody}>
            <p style={{ paddingLeft: 30 }}>
              {t('analyser.details.Volatility.CompanyShare')}
            </p>
          </div>
          <div className={classes.infoBody}>
            <p style={{ margin: 0 }}>
              {Math.round(risks.success.averageMarketVolatility * 100) / 100}
            </p>
          </div>
        </div>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Volatility.VolatilityChart')}
          </div>
          <div id="chart-timeline">
            <ReactApexChart
              options={options}
              series={[
                { name: 'Volatility', data: volatileSeries },
                { name: 'Market', data: marketSeries },
              ]}
              height={300}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Volatility;
