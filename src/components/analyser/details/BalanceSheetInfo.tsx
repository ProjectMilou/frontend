import React from 'react';
import Chart from 'react-apexcharts';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import InfoButton from '../../shared/InfoButton';
import { checkValue, checkName } from '../../../analyser/Helper';
import SubsectionDivider from '../../shared/SubsectionDivider';

type BalanceSheetProps = {
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
    mapWrapper: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      display: 'flex',
    },
    contentWrapper: {
      paddingBottom: '2rem',
      paddingTop: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
      marginBottom: '2rem',
      alignItems: 'center',
    },
  })
);

/**
 * This component gives an overview over a company's balance sheet. Everything is represented in a treemap chart
 *
 * @param companyReports List of company reports as in
 */
const BalanceSheetInfo: React.FC<BalanceSheetProps> = ({ companyReports }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  // assets data from backend cleanup
  const assetSeries = {
    cashShortTermInvestments: checkValue(
      companyReports.annualReports[0].cashAndShortTermInvestments
    ),
    inventory: checkValue(companyReports.annualReports[0].inventory),
    receivables: checkValue(
      companyReports.annualReports[0].currentNetReceivables
    ),
    physicalAssets: checkValue(
      companyReports.annualReports[0].propertyPlantEquipment
    ),
    deprecationAndAmortization: checkValue(
      companyReports.annualReports[0].accumulatedDepreciationAmortizationPPE
    ),
    intangibleAssets: checkValue(
      companyReports.annualReports[0].intangibleAssets
    ),
    longTermInvestments: checkValue(
      companyReports.annualReports[0].longTermInvestments
    ),
    otherCurrentAssets: checkValue(
      companyReports.annualReports[0].otherCurrentAssets
    ),
    otherNonCurrentAssets: checkValue(
      companyReports.annualReports[0].otherNonCurrentAssets
    ),
  };

  // assets data displayed in treemap
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
          x: checkName(assetSeries.physicalAssets, 'Physical Assets'),
          y: assetSeries.physicalAssets,
        },
        {
          x: checkName(
            assetSeries.deprecationAndAmortization,
            'Deprecation and Amortization'
          ),
          y: assetSeries.deprecationAndAmortization,
        },
        {
          x: checkName(assetSeries.intangibleAssets, 'Intangible Assets'),
          y: assetSeries.intangibleAssets,
        },
        {
          x: 'Longterm & Other Assets',
          y:
            // multiplied by 1 to avoid weird string concatenation error we get from backend
            assetSeries.longTermInvestments * 1 +
            assetSeries.otherCurrentAssets * 1 +
            assetSeries.otherNonCurrentAssets * 1,
        },
      ],
    },
  ];

  // liabilities and equity data from backend cleaned up
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

  // data displayed in treemap
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
        // Placeholder to allow for red coloring of debt field in treemap
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

  // options for ApexChart
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
      // Together with place holder allows for specific coloring of debt field in treemap
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
      noData: {
        text: 'Currently no Data available ;(',
      },
    },
    tooltip: {
      x: {
        show: false,
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (seriesName: string) => `€${seriesName}M`,
        title: {
          formatter: (seriesName: string) => `${seriesName}:`,
        },
      },
      marker: {
        show: false,
      },
    },
  };

  return (
    <>
      <SubsectionDivider
        subsection={t('analyser.details.BalanceSheetHeader')}
      />
      <Container className={classes.contentWrapper}>
        <div className={classes.mapWrapper}>
          <h5 className={classes.boxTitles}>
            {t('analyser.details.BalanceSheet.Assets')}
            <>&nbsp;</>
            <InfoButton
              infotext={t('analyser.details.BalanceSheet.Assets.infoButton')}
            />
          </h5>

          <Chart
            options={options}
            type="treemap"
            series={assets}
            height={350}
            width={400}
          />
        </div>
        <div className={classes.mapWrapper}>
          <h5 className={classes.boxTitles}>
            {t('analyser.details.BalanceSheet.Liabilities')}
            <>&nbsp;</>
            <InfoButton
              infotext={t(
                'analyser.details.BalanceSheet.Liabilities.infoButton'
              )}
            />
          </h5>
          <Chart
            options={options}
            type="treemap"
            series={liabilitiesEquities}
            height={350}
            width={400}
          />
        </div>
      </Container>
    </>
  );
};

export default BalanceSheetInfo;
