import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import * as API from '../../../analyser/APIClient';
import { moneyFormat, checkNaN } from '../../../analyser/Helper';
import SubsectionDivider from '../../shared/SubsectionDivider';
import InfoBlock from './InfoBlock';

// Leverage props type declaration
export type LeverageProps = {
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
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
  })
);

function getDebtSeries(companyReports: API.CompanyReports): string[] {
  const debtSeries: string[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num = moneyFormat(companyReports.annualReports[index].currentDebt);
    if (num === 'NaN') {
      debtSeries.push('0.0');
    } else {
      debtSeries.push(num);
    }
  }
  return debtSeries;
}

function getEquitySeries(companyReports: API.CompanyReports): string[] {
  const equitySeries: string[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num = moneyFormat(
      companyReports.annualReports[index].retainedEarnings
    );
    if (num === 'NaN') {
      equitySeries.push('0.0');
    } else {
      equitySeries.push(num);
    }
  }
  return equitySeries;
}

/**
 * @param stockOverview - Stock overview object which is used to display data
 * @param companyReports - Company reports object
 * @param interestCoverages - Interest Coverages values
 * @return Leverage Section on detail page which includes Debt and Equity line chart and text values.
 */
const Leverage: React.FC<LeverageProps> = ({
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
      title: {
        text: t('analyser.details.Leverage.DebtLevelYAxis'),
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: 'grey',
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (seriesName: string) => `€${seriesName}M`,
        title: {
          formatter: (seriesName: string) => `${seriesName}:`,
        },
      },
    },
    fill: {
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

  const deptLevel =
    companyReports.annualReports[0].currentDebt /
    companyReports.annualReports[0].totalAssets;

  return (
    <div>
      <SubsectionDivider subsection="analyser.details.Leverage" />
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Leverage.DebtDevelopment')}
          </div>
          <ReactApexChart
            options={options}
            series={[
              { name: 'Debt', data: getDebtSeries(companyReports) },
              { name: 'Equity', data: getEquitySeries(companyReports) },
            ]}
            height={300}
            width="100%"
          />
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.boxTitles}>
            <InfoBlock
              title={t('analyser.details.Leverage.DebtLevel')}
              body={
                <p style={{ margin: 0 }}>
                  {' '}
                  {companyReports.annualReports[0].currentDebt != null &&
                  companyReports.annualReports[0].totalAssets != null
                    ? checkNaN(deptLevel)
                    : (stockOverview.symbol,
                      t('analyser.details.Leverage.ErrorMessage'))}{' '}
                </p>
              }
              info={t('analyser.details.Leverage.DebtLevel.infoButton')}
            />
          </div>

          <InfoBlock
            title={t('analyser.details.Leverage.InterestCoverage')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {interestCoverages.success[0].interestCoverage != null
                  ? interestCoverages.success[0].interestCoverage.toFixed(2)
                  : interestCoverages.error}{' '}
              </p>
            }
            info={t('analyser.details.Leverage.InterestCoverage.infoButton')}
          />
        </div>
      </div>
    </div>
  );
};
export default Leverage;
