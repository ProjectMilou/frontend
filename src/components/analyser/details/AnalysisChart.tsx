import React from 'react';
import Chart from 'react-apexcharts';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export type Series = {
  name: string;
  data: number[];
};

type AnalysisChartProps = {
  series: number[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
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
  })
);

const AnalysisChart: React.FC<AnalysisChartProps> = ({
  series
}
) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const options = {
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        },
      },
    },
    fill: {
      type: 'gradient',
      colors: '#3da97e',
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
         hollow: {
          margin: 0,
          size: '70%',
          background: '#EEF1FB',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#EEF1FB',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
    
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function format(val: string) {
              return parseInt(val, 10);
            },
            color: '#122654',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    labels: ['Score'],

  };
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.KeyFiguresHeader.Analysts')}
          </h2>
        </div>
      </div>
    <div id="chart">
    <Chart options={options} series={series} type="radialBar" height={350} />
  </div>
  </div>
  );
};

export default AnalysisChart;
