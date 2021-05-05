import React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import DividendRatioDonut from '../../shared/DividendRatioDonut';
import DividendLineChart, { Series } from '../../shared/DividendLineChart';
import DividendsRR from './DividendsRR';
import SubsectionDivider from '../../shared/SubsectionDivider';
import InfoBlock from './InfoBlock';

const useStyles = makeStyles(() =>
  createStyles({
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    lineChartWrapper: {
      width: '40rem',
      height: '20rem',
      flexBasis: '60%',
    },
    infoContainer: {
      height: '100%',
      width: '100%',
      flexBasis: '35%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'left',
      padding: '1rem',
    },
  })
);

// Dividends props type declaration
export type DividendsProps = {
  series: number[];
  cashFlowList: API.CashFlowList;
  dividendPayoutRatio: number;
  dividendYield: number;
  nextPayout?: Date;
};

/**
 * @param series - Dividend yield data
 * @param cashFlowList - Cash flow list data, used to calculate dividend payout ratio
 * @param dividendPayoutRatio - Dividend Payout Ratio
 * @param dividendYield - Dividend Yield
 * @param nextPayout - next payout of dividend
 * @return Dividends Section on detail page which includes dividend line chart, donut ratio chart and Reward & Risk.
 */
const Dividends: React.FC<DividendsProps> = ({
  series,
  cashFlowList,
  dividendPayoutRatio,
  dividendYield,
  nextPayout,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const cashData: number[] = [];
  cashFlowList.annualReports.forEach((element) => {
    cashData.push(
      Math.round((element.dividendPayout / element.netIncome) * 10000) / 100
    );
  });
  const seriesArray: Series[] = [
    {
      name: t('analyser.detail.dividend.payoutratio'),
      type: 'column',
      data: cashData,
    },
    {
      name: t('analyser.detail.dividend.yield'),
      type: 'line',
      data: series,
    },
  ];

  const year = cashFlowList.annualReports[0].fiscalDateEnding.substring(0, 4);
  return (
    <>
      <SubsectionDivider subsection={t('analyser.details.DividendsHeader')} />
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <DividendLineChart
            series={seriesArray}
            height={350}
            textColor={theme.palette.primary.dark}
            year={parseInt(year, 10)}
          />
        </div>
        <div className={classes.infoContainer}>
          {/* right side with infoBlocks */}
          <InfoBlock
            title={t('analyser.details.DividendYield')}
            info={t('analyser.details.DividendYield.infoButton')}
            body={
              <p>
                {dividendYield === 0
                  ? `${t('analyser.details.noDividendPayed')}`
                  : `${Math.round(dividendYield * 100) / 100}%`}
              </p>
            }
          />
          <InfoBlock
            title={t('analyser.details.DividendPayoutRatio')}
            info={t('analyser.details.DividendPayoutRatio.infoButton')}
            body={<DividendRatioDonut ratio={dividendPayoutRatio} />}
          />
          <InfoBlock
            title={t('portfolio.details.nextDate')}
            info={t('analyser.details.NextDate.infoButton')}
            body={
              nextPayout ? (
                <p>{nextPayout.toISOString().split('T')[0]}</p>
              ) : (
                <p> {t('analyser.details.noDividendPlanned')}</p>
              )
            }
          />
        </div>
      </div>

      <DividendsRR dividend={dividendYield} payoutRatio={dividendPayoutRatio} />
    </>
  );
};
export default Dividends;
