import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Toolbar } from '@material-ui/core';
import * as API from '../../../analyser/APIClient';
import DividendRatioDonut from '../../shared/DividendRatioDonut';
import DividendLineChart from '../../shared/DividendLineChart';
import DividendsRR from './DividendsRR';
import InfoButton from '../../shared/InfoButton';
import SubsectionDivider from '../../shared/SubsectionDivider';

// props type declaration
export type DividendsProps = {
  series: number[];
  cashFlowList: API.CashFlowList;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
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
      margin: '0.5rem 0.5rem',
    },
  })
);

// type declarations
type InfoBlockProps = {
  title: string;
  info: string;
  body: ReactElement;
};

// returns the details page header
const InfoBlock: React.FC<InfoBlockProps> = ({ title, info, body }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <Toolbar disableGutters>
          <p className={classes.infoTitleP}>{title}</p>
          <InfoButton infotext={info}> </InfoButton>
        </Toolbar>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

const Dividends: React.FC<DividendsProps> = ({ series, cashFlowList }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const cashData: number[] = [];
  cashFlowList.annualReports.forEach((element) => {
    cashData.push(
      Math.floor((element.dividendPayout / element.netIncome) * 100) / 100
    );
  });
  // TODO fetch data from backend
  // eslint-disable-next-line
  const [seriesArray, setSeriesArray] = React.useState([
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
  ]);

  let ratio =
    Math.round(
      // TODO
      // This values do not exists, pls fix
      // (stockOverview.dividendPerShare / stockOverview.revenuePerShareTTM) * 100
      100
    ) / 100;
  if (Number.isNaN(ratio)) {
    ratio = 0.0;
  }
  const dividendYield = series[4];
  const dividendYieldText = (dividendYield * 100).toFixed(2);
  return (
    <div>
      <SubsectionDivider subsection="analyser.details.DividendsHeader" />
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <DividendLineChart
            series={seriesArray}
            height={350}
            // TODO: please change this to whatever color you guys want/need
            textColor="rgba(0, 0, 0, 0.87)"
          />
        </div>
        <div className={classes.infoContainer}>
          {/* right side with info */}
          <InfoBlock
            title={t('analyser.details.DividendYield')}
            info={t('analyser.details.DividendYield.infoButton')}
            body={
              <p style={{ margin: 0 }}>
                {' '}
                {Number.isNaN(dividendYieldText)
                  ? `${dividendYieldText}|%`
                  : ' Dividend data is not found.'}{' '}
              </p>
            }
          />
          <InfoBlock
            title={t('analyser.details.DividendPayoutRatio')}
            info={t('analyser.details.DividendPayoutRatio.infoButton')}
            body={<DividendRatioDonut ratio={ratio} />}
          />
          <InfoBlock
            title={t('analyser.details.NextDate')}
            info={t('analyser.details.NextDate.infoButton')}
            body={<p style={{ margin: 0 }}>14.04.2021</p>}
          />
        </div>
      </div>

      <DividendsRR dividend={dividendYield} payoutRatio={ratio} />
    </div>
  );
};
export default Dividends;
