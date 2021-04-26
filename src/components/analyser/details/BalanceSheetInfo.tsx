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
import SubsectionDivider from '../../shared/SubsectionDivider';

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
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
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

function checkName(val: number, text: string): string {
  let result = text;
  if (val === 0) {
    result = '';
  }
  return result;
}

// sadly not supported for now by treemap
// eslint-disable-next-line
function convertToInternationalCurrencySystem(val: number) {
  // based on https://stackoverflow.com/a/36734774

  if (Math.abs(Number(val)) >= 1.0e9) {
    // Nine Zeroes for Billions
    return `${(Math.abs(Number(val)) / 1.0e9).toFixed(2)} B`;
  }
  if (Math.abs(Number(val)) >= 1.0e6) {
    // Six Zeroes for Millions
    return `${(Math.abs(Number(val)) / 1.0e6).toFixed(2)} M`;
  }
  if (Math.abs(Number(val)) >= 1.0e3) {
    // Three Zeroes for Thousands
    return `${(Math.abs(Number(val)) / 1.0e3).toFixed(2)} K`;
  }
  return Math.abs(Number(val)).toString();
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
          x: checkName(
            assetSeries.cashShortTermInvestments,
            'Cash & Short term Investments'
          ),
          y: assetSeries.cashShortTermInvestments,
        },
        {
          x: checkName(assetSeries.inventory, 'Inventory'),
          y: assetSeries.inventory,
        },
        {
          x: checkName(assetSeries.receivables, 'Receivables'),
          y: assetSeries.receivables,
        },
        {
          x: checkName(assetSeries.physicalAsssets, 'Physical Assets'),
          y: assetSeries.physicalAsssets,
        },
        {
          x: checkName(
            assetSeries.deprecationAndAmortisation,
            'Deprecation and Amortisation'
          ),
          y: assetSeries.deprecationAndAmortisation,
        },
        {
          x: checkName(assetSeries.intangibleAssets, 'Intangible Assets'),
          y: assetSeries.intangibleAssets,
        },
        {
          x: 'Longterm & Other Assets',
          y:
            // multiplied by 1 to avoid weird string concatenation error
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
          x: checkName(equitiesSeries.equity, 'Equity'),
          y: equitiesSeries.equity,
        },
        {
          x: 'Other Liabilities',
          y:
            // multiplied by 1 to avoid weird string concatenation error
            equitiesSeries.otherCurrentLiabilities * 1 +
            equitiesSeries.otherNonCurrentLiabilities * 1,
        },
        {
          x: checkName(equitiesSeries.accountsPayable, 'Accounts Payable'),
          y: equitiesSeries.accountsPayable,
        },
        {
          x: checkName(equitiesSeries.defferedRevenue, 'Deffered Revenue'),
          y: equitiesSeries.defferedRevenue,
        },
        {
          x: checkName(
            equitiesSeries.capitalLeaseObligations,
            'Capital Lease Obligations'
          ),
          y: equitiesSeries.capitalLeaseObligations,
        },
        {
          x: checkName(equitiesSeries.retainedEarnings, 'Retained Earnings'),
          y: equitiesSeries.retainedEarnings,
        },
        // Place Holder to allow for red coloring of debt Fiel in Tree Map
        {
          x: '',
          y: 0,
        },
        {
          x: checkName(equitiesSeries.debt, 'Debt'),
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
      // Togehter with PLace Holder allows for specific coloring of debt field in Tree Map
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.success.main,
      theme.palette.error.main,
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
      <SubsectionDivider subsection="analyser.details.BalanceSheetHeader" />
      <div className={classes.infoContainer}>
        <div className={classes.MapWrapper}>
          <div className={classes.titleContainer}>
            <div className={classes.titleWrapper}>
              <h5 className={classes.boxTitles}>
                {t('analyser.details.BalanceSheet.Assets')}
                <>&nbsp;</>
                <InfoButton
                  infotext={t(
                    'analyser.details.BalanceSheet.Assets.infoButton'
                  )}
                />
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
                <InfoButton
                  infotext={t(
                    'analyser.details.BalanceSheet.Liabilities.infoButton'
                  )}
                />
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
