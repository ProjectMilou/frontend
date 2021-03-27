import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    chartContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    chartWrapper: {
      flexBasis: '50%',
    },
    textWrapper: {
      position: 'absolute',
      height: '95%',
      width: '100%',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.primary.contrastText,
      fontFamily: typography.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

type RatioDonutProps = {
  ratio: number;
};

const RatioDonut: React.FC<RatioDonutProps> = ({ ratio }) => {
  // const theme = useTheme();
  const classes = useStyles();

  const [state] = useState({
    series: [ratio, 1 - ratio],
    options: {
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      fill: {
        colors: ['#00e396', '#008ffb'],
      },
      chart: {
        redrawOnWindowResize: false,
        redrawOnParentResize: false,
      },
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    },
  });

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartWrapper}>
        <Chart
          options={state.options}
          series={state.series}
          type="donut"
          height={140}
          width="100%"
        />
        <div className={classes.textWrapper}>
          <p style={{ margin: 0 }}>{`${ratio * 100}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default RatioDonut;
