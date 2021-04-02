import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DividendRatioDonut from '../../charts/DividendRatioDonut';
import DividendLineChart from '../../charts/DividendLineChart';

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
    sectionSubTitle: {
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: 400,
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
      alignItems: 'center',
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

const Dividends: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO fetch data from backend
  // eslint-disable-next-line
  const [seriesArray, setSeriesArray] = React.useState([
    {
      name: t('analyser.detail.dividend.payoutratio'),
      type: 'column',
      data: [25.0, 20.35, 18.72, 21.9, 23.11],
    },
    {
      name: t('analyser.detail.dividend.yield'),
      type: 'line',
      data: [0.58, 0.71, 0.8, 1.12, 0.97],
    },
  ]);

  const ratio = 0.25;
  const dividendYield = 0.017;
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.DividendsHeader')}
          </h2>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <DividendLineChart series={seriesArray} />
        </div>
        <div className={classes.infoContainer}>
          {/* right side with info */}
          <InfoBlock
            title={t('analyser.details.DividendYield')}
            body={<p style={{ margin: 0 }}>{(dividendYield * 100).toFixed(2)}%</p>}
          />
          <InfoBlock
            title={t('analyser.details.DividendPayoutRatio')}
            body={<DividendRatioDonut ratio={ratio} />}
          />
          <InfoBlock
            title={t('analyser.details.NextDate')}
            body={<p style={{ margin: 0 }}>14.04.2021</p>}
          />
        </div>
      </div>
    </div>
  );
};
export default Dividends;
