import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import * as API from '../../../analyser/APIClient';

// props type declaration
export type DetailsProps = {
  stockOverview: API.Stock;
  companyReports: API.CompanyReports;
  interestCoverages: API.InterestCoverageList;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    customSize: {
      maxWidth: 500,
    },
    root: {
      margin: '25px auto',
      minWidth: '50%',
    },
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    sectionSubTitle: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: typography.fontWeightRegular,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      borderColor: palette.primary.main,
    },
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

const Leverage: React.FC<DetailsProps> = ({
  stockOverview,
  companyReports,
  interestCoverages,
}) => {
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

  const deptCoverage = (
    companyReports.annualReports[0].currentDebt /
    companyReports.annualReports[0].totalAssets
  ).toFixed(2);

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

  const equitySeries: number[] = [];
  for (let index = 0; index < 5; index += 1) {
    const num =
      Math.round(companyReports.annualReports[index].retainedEarnings * 100) /
      100;
    if (Number.isNaN(num)) {
      equitySeries.push(0);
    } else {
      equitySeries.push(num);
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
                {companyReports.annualReports[0].currentDebt != null
                  ? companyReports.annualReports[0].currentDebt
                  : (stockOverview.symbol, " doesn't share Debt Level.")}{' '}
              </p>
            }
          />
          <InfoBlock
            title={t('analyser.details.Leverage.DebtCoverage')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {deptCoverage != null
                  ? deptCoverage
                  : (stockOverview.symbol,
                    " doesn't share Debt Coverage.")}{' '}
              </p>
            }
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
          />
        </div>
      </div>
    </div>
  );
};
export default Leverage;
