import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import { Toolbar } from '@material-ui/core';
import InfoButton from '../../shared/InfoButton';

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
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    sectionSubTitle: {
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: 'grey',
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
      margin: '0.5rem 0.5rem',
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

const debtSeries = [
  [1358895600000, 38.25],
  [1358982000000, 38.1],
  [1359068400000, 38.32],
  [1359327600000, 38.24],
  [1359414000000, 38.52],
  [1359500400000, 37.94],
  [1359586800000, 37.83],
  [1359673200000, 38.34],
  [1359932400000, 38.1],
  [1360018800000, 38.51],
  [1360105200000, 38.4],
  [1360191600000, 38.07],
  [1360278000000, 39.12],
  [1360537200000, 38.64],
  [1360623600000, 38.89],
  [1360710000000, 38.81],
  [1360796400000, 38.61],
  [1360882800000, 38.63],
  [1361228400000, 38.99],
  [1361314800000, 38.77],
  [1361401200000, 38.34],
  [1361487600000, 38.55],
  [1361746800000, 38.11],
  [1361833200000, 38.59],
  [1361919600000, 39.6],
];

// type declarations
type InfoBlockProps = {
  title: string;
  body: ReactElement;
  info: string;
};

// returns the details page header
const InfoBlock: React.FC<InfoBlockProps> = ({ title, body, info }) => {
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

const Leverage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const options = {
    colors: ['#008ffb'],
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
    xaxis: {
      type: 'datetime',
      min: new Date('23 JAN 2013').getTime(),
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

  return (
    <div>
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <div className={classes.title}>
            {t('analyser.details.Leverage.DebtDevelopment')}
          </div>
          <ReactApexChart
            options={options}
            series={[{ name: 'Debt', data: debtSeries }]}
            height={300}
            width="100%"
          />
        </div>
        <div className={classes.infoContainer}>
          <InfoBlock
            title={t('analyser.details.Leverage.DebtLevel')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Leverage.DebtLevel.infoButton')}
          />
          <InfoBlock
            title={t('analyser.details.Leverage.DebtCoverage')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Leverage.DebtCoverage.infoButton')}
          />
          <InfoBlock
            title={t('analyser.details.Leverage.InterestCoverage')}
            body={<p style={{ margin: 0 }}> 0.5 </p>}
            info={t('analyser.details.Leverage.InterestCoverage.infoButton')}
          />
        </div>
      </div>
    </div>
  );
};
export default Leverage;
