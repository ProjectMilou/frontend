import React from 'react';
import Chart from 'react-apexcharts';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';

export type BalanceSheetProps = {
  companyReports: API.CompanyReports;
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    infoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    MapWrapper: {
      width: '20rem',
      height: '20rem',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    titleContainer: {
      display: 'flex',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionSubTitle: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    contentWrapper: {
      paddingBottom: '2rem',
      paddingTop: '1rem',
    },
  })
);

const BalanceSheetInfo: React.FC<BalanceSheetProps> = ({ companyReports }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const assets = [
    {
      data: [
        {
          x: 'Cash & Short term Investments',
          y: companyReports.annualReports[0].cashAndShortTermInvestments,
        },
        {
          x: 'Inventory',
          y: companyReports.annualReports[0].inventory,
        },
        {
          x: 'Receivables',
          y: companyReports.annualReports[0].currentNetReceivables,
        },
        {
          x: 'Physical Assets',
          y: companyReports.annualReports[0].propertyPlantEquipment,
        },
        {
          x: 'Deprecation and Amortisation',
          y:
            companyReports.annualReports[0]
              .accumulatedDepreciationAmortizationPPE,
        },
        {
          x: 'Intangible Assets',
          y: companyReports.annualReports[0].intangibleAssets,
        },
        {
          x: 'Longterm & Other Assets',
          y:
            companyReports.annualReports[0].longTermInvestments * 1 +
            companyReports.annualReports[0].otherCurrentAssets * 1 +
            companyReports.annualReports[0].otherNonCurrrentAssets * 1,
        },
      ],
    },
  ];

  const liabilitiesEquities = [
    {
      data: [
        {
          x: 'Equity',
          y: companyReports.annualReports[0].totalShareholderEquity,
        },
        {
          x: 'Other Liabilities',
          y:
            companyReports.annualReports[0].otherCurrentLiabilities * 1 +
            companyReports.annualReports[0].otherNonCurrentLiabilities * 1,
        },
        {
          x: 'Accounts Payable',
          y: companyReports.annualReports[0].currentAccountsPayable,
        },
        {
          x: 'Deffered Revenue',
          y: companyReports.annualReports[0].deferredRevenue,
        },
        {
          x: 'Capital Lease Obligations',
          y: companyReports.annualReports[0].capitalLeaseObligations,
        },
        {
          x: 'Retained Earnings',
          y: companyReports.annualReports[0].retainedEarnings,
        },
        {
          x: '',
          y: 0,
        },
        {
          x: 'Debt',
          y: companyReports.annualReports[0].currentDebt,
        },
      ],
    },
  ];

  const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 150,
      type: 'treemap',
      toolbar: {
        show: false,
      },
    },
    colors: [
      '#50E2A8',
      '#50E2A8',
      '#50E2A8',
      '#50E2A8',
      '#50E2A8',
      '#50E2A8',
      '#50E2A8',
      '#D64745',
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    dataLabels: {
      style: {
        colors: [theme.palette.primary.main],
      },
    },
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.BalanceSheetHeader')}
          </h2>
        </div>
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.MapWrapper}>
          <div className={classes.titleContainer}>
            <div className={classes.titleWrapper}>
              <h5 className={classes.boxTitles}>
                {t('analyser.details.BalanceSheet.Assets')}
              </h5>
            </div>
          </div>
          <Chart
            options={options}
            type="treemap"
            series={assets}
            height={350}
            width={400}
          />
        </div>
        <div className={classes.MapWrapper}>
          <div className={classes.titleContainer}>
            <div className={classes.titleWrapper}>
              <h5 className={classes.boxTitles}>
                {t('analyser.details.BalanceSheet.Liabilities')}
              </h5>
            </div>
          </div>
          <Chart
            options={options}
            type="treemap"
            series={liabilitiesEquities}
            height={350}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetInfo;
