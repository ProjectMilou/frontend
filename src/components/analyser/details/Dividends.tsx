import React, { ReactElement } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import DividendRatioDonut from '../../shared/DividendRatioDonut';
import DividendLineChart, { Series } from '../../shared/DividendLineChart';
import DividendsRR from './DividendsRR';
import InfoButton from '../../shared/InfoButton';
import SubsectionDivider from '../../shared/SubsectionDivider';

// Dividends props type declaration
export type DividendsProps = {
  series: number[];
  cashFlowList: API.CashFlowList;
  dividendYield: number;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionSubTitle: {
      margin: 0,
      color: palette.primary.main,
      fontSize: '2rem',
      fontWeight: typography.fontWeightRegular,
      whiteSpace: 'nowrap',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
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
    infoWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },
    infoBody: {
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'left',
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
      margin: '0.5rem 0rem',
      display: 'flex',
    },
  })
);

// InfoBlock props type declarations
type InfoBlockProps = {
  title: string;
  info: string;
  body: ReactElement;
};

// returns the details page header
/**
 * @param title - Title of the information block.
 * @param info - Information in the info button.
 * @param body - Specific information.
 * @return A information block which contains a title , a info button and body.
 */
const InfoBlock: React.FC<InfoBlockProps> = ({ title, info, body }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <p className={classes.infoTitleP}>
          {title}
          <>&nbsp;</>
          <InfoButton infotext={info}> </InfoButton>
        </p>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

/**
 * @param series - Dividend yield data
 * @param cashFlowList - Cash flow list data, used to calculate dividend payout ratio
 * @param dividendYield - Dividend Yield
 * @return Dividends Section on detail page which includes dividend line chart, donut ratio chart and Reward & Risk.
 */
const Dividends: React.FC<DividendsProps> = ({
  series,
  cashFlowList,
  dividendYield,
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
  const lastAnnualReports =
    cashFlowList.annualReports[cashFlowList.annualReports.length - 1];
  const dividendPayoutRatio =
    Math.round(
      (lastAnnualReports.dividendPayout / lastAnnualReports.netIncome) * 100
    ) / 100;
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
              <p style={{ margin: 0 }}>
                {' '}
                {dividendYield === 0
                  ? 'Dividend is not paid.'
                  : `${Math.round(dividendYield * 100) / 100}%`}{' '}
              </p>
            }
          />
          <InfoBlock
            title={t('analyser.details.DividendPayoutRatio')}
            info={t('analyser.details.DividendPayoutRatio.infoButton')}
            body={<DividendRatioDonut ratio={dividendPayoutRatio} />}
          />
          <InfoBlock
            title={t('analyser.details.NextDate')}
            info={t('analyser.details.NextDate.infoButton')}
            body={<p style={{ margin: 0 }}>2021-04-14</p>}
          />
        </div>
      </div>

      <DividendsRR dividend={dividendYield} payoutRatio={dividendPayoutRatio} />
    </>
  );
};
export default Dividends;
