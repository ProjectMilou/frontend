import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import * as API from '../../../analyser/APIClient';
import InfoButton from '../../shared/InfoButton';

// props type declaration
export type DetailsProps = {
  stockOverview: API.Stock;
  companyReports: API.CompanyReports;
  interestCoverages: API.InterestCoverageList;
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
      fontWeight: typography.fontWeightBold,
      fontSize: '0.8rem',
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
        <p className={classes.infoTitleP}>
          {title}
          <>&nbsp;</>
          <InfoButton infotext={info} />
        </p>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

const Leverage: React.FC<DetailsProps> = ({
  stockOverview,
  companyReports,
  interestCoverages,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const options = {
    colors: [theme.palette.success.main, theme.palette.lightBlue.main],
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

  const debtSeries: number[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num =
      Math.round(companyReports.annualReports[index].currentDebt * 100) / 100;
    if (Number.isNaN(num)) {
      debtSeries.push(0);
    } else {
      debtSeries.push(num);
    }
  }

  let countNegativeEquity = 0;
  const equitySeries: number[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num =
      Math.round(companyReports.annualReports[index].retainedEarnings * 100) /
      100;
    if (Number.isNaN(num)) {
      equitySeries.push(0);
    } else {
      if (num < 0) {
        countNegativeEquity += 1;
      }
      equitySeries.push(num);
    }
  }

  if (countNegativeEquity === 5) {
    for (let index = 0; index < 5; index += 1) {
      equitySeries[index] = -equitySeries[index];
    }
  }

  return (
    <div>
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Leverage.DebtDevelopment')}
          </div>
          <ReactApexChart
            options={options}
            series={[
              { name: 'Debt', data: debtSeries },
              { name: 'Equity', data: equitySeries },
            ]}
            height={300}
            width="100%"
          />
        </div>
        <div className={classes.infoContainer}>
          <InfoBlock
            title={t('analyser.details.Leverage.DebtLevel')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {companyReports.annualReports[0].currentDebt != null &&
                companyReports.annualReports[0].totalAssets != null
                  ? Math.round(
                      (companyReports.annualReports[0].currentDebt /
                        companyReports.annualReports[0].totalAssets) *
                        1000
                    ) / 1000
                  : (stockOverview.symbol,
                    t('analyser.details.Leverage.ErrorMessage'))}{' '}
              </p>
            }
            info={t('analyser.details.Leverage.DebtLevel')}
          />
          <InfoBlock
            title={t('analyser.details.Leverage.InterestCoverage')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {interestCoverages.success != null
                  ? interestCoverages.success[0].interestCoverage.toFixed(2)
                  : interestCoverages.error}{' '}
              </p>
            }
            info={t('analyser.details.Leverage.InterestCoverage')}
          />
        </div>
      </div>
    </div>
  );
};
export default Leverage;
