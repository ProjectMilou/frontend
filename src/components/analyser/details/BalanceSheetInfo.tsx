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
import InfoButton from '../../shared/InfoButton';

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

function checkValue(val: number): number {
  let result = val;
  if (val.toString() === 'None') {
    result = 0;
  }
  return result;
}

function deleteName(val: number, text: string): string {
  let result = text;
  if (val === 0) {
    result = '';
  }
  return result;
}

const BalanceSheetInfo: React.FC<BalanceSheetProps> = ({ companyReports }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const assetSeries = {
    cashShortTermInvestments: checkValue(
      companyReports.annualReports[0].cashAndShortTermInvestments
    ),
    inventory: checkValue(companyReports.annualReports[0].inventory),
    receivables: checkValue(
      companyReports.annualReports[0].currentNetReceivables
    ),
    physicalAsssets: checkValue(
      companyReports.annualReports[0].propertyPlantEquipment
    ),
    deprecationAndAmortisation: checkValue(
      companyReports.annualReports[0].accumulatedDepreciationAmortizationPPE
    ),
    intangibleAssets: checkValue(
      companyReports.annualReports[0].intangibleAssets
    ),
    longTermInvestements: checkValue(
      companyReports.annualReports[0].longTermInvestments
    ),
    otherCurrentAssets: checkValue(
      companyReports.annualReports[0].otherCurrentAssets
    ),
    otherNonCurrentAssets: checkValue(
      companyReports.annualReports[0].otherNonCurrrentAssets
    ),
  };

  const assets = [
    {
      data: [
        {
          x: deleteName(
            assetSeries.cashShortTermInvestments,
            'Cash & Short term Investments'
          ),
          y: assetSeries.cashShortTermInvestments,
        },
        {
          x: deleteName(assetSeries.inventory, 'Inventory'),
          y: assetSeries.inventory,
        },
        {
          x: deleteName(assetSeries.receivables, 'Receivables'),
          y: assetSeries.receivables,
        },
        {
          x: deleteName(assetSeries.physicalAsssets, 'Physical Assets'),
          y: assetSeries.physicalAsssets,
        },
        {
          x: deleteName(
            assetSeries.deprecationAndAmortisation,
            'Deprecation and Amortisation'
          ),
          y: assetSeries.deprecationAndAmortisation,
        },
        {
          x: deleteName(assetSeries.intangibleAssets, 'Intangible Assets'),
          y: assetSeries.intangibleAssets,
        },
        {
          x: 'Longterm & Other Assets',
          y:
            assetSeries.longTermInvestements * 1 +
            assetSeries.otherCurrentAssets * 1 +
            assetSeries.otherNonCurrentAssets * 1,
        },
      ],
    },
  ];

  const equitiesSeries = {
    equity: checkValue(companyReports.annualReports[0].totalShareholderEquity),
    otherCurrentLiabilities: checkValue(
      companyReports.annualReports[0].otherCurrentLiabilities
    ),
    otherNonCurrentLiabilities: checkValue(
      companyReports.annualReports[0].otherNonCurrentLiabilities
    ),
    accountsPayable: checkValue(
      companyReports.annualReports[0].currentAccountsPayable
    ),
    defferedRevenue: checkValue(
      companyReports.annualReports[0].deferredRevenue
    ),
    capitalLeaseObligations: checkValue(
      companyReports.annualReports[0].capitalLeaseObligations
    ),
    retainedEarnings: checkValue(
      companyReports.annualReports[0].retainedEarnings
    ),
    debt: checkValue(companyReports.annualReports[0].currentDebt),
  };

  const liabilitiesEquities = [
    {
      data: [
        {
          x: deleteName(equitiesSeries.equity, 'Equity'),
          y: equitiesSeries.equity,
        },
        {
          x: 'Other Liabilities',
          y:
            equitiesSeries.otherCurrentLiabilities * 1 +
            equitiesSeries.otherNonCurrentLiabilities * 1,
        },
        {
          x: deleteName(equitiesSeries.accountsPayable, 'Accounts Payable'),
          y: equitiesSeries.accountsPayable,
        },
        {
          x: deleteName(equitiesSeries.defferedRevenue, 'Deffered Revenue'),
          y: equitiesSeries.defferedRevenue,
        },
        {
          x: deleteName(
            equitiesSeries.capitalLeaseObligations,
            'Capital Lease Obligations'
          ),
          y: equitiesSeries.capitalLeaseObligations,
        },
        {
          x: deleteName(equitiesSeries.retainedEarnings, 'Retained Earnings'),
          y: equitiesSeries.retainedEarnings,
        },
        {
          x: '',
          y: 0,
        },
        {
          x: deleteName(equitiesSeries.debt, 'Debt'),
          y: equitiesSeries.debt,
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
                <>&nbsp;</>
                <InfoButton infotext="Assets are super important!!!" />
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
                <>&nbsp;</>
                <InfoButton infotext="Liabilities and Equities also pretty important!" />
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
