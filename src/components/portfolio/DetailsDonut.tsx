import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles, createStyles, Theme, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LimitString from './LimitedString';
import { roundAxis } from '../../portfolio/Helper';

type StyleProps = {
  color: string;
};

const useStyles = makeStyles<Theme, StyleProps>(({ palette }: Theme) =>
  createStyles({
    chart: {
      flexBasis: '50%',
    },
    legend: {
      flexBasis: '50%',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      color: palette.primary.contrastText,
    },
    legendDot: {
      minWidth: '0.8rem',
      minHeight: '0.8rem',
      borderRadius: '50%',
      backgroundColor: (props) => props.color,
      marginRight: '0.5rem',
    },
  })
);

type LegendItemProps = {
  name: string;
  color: string;
};

const LegendItem: React.FC<LegendItemProps> = ({ name, color }) => {
  const classes = useStyles({ color });

  return (
    <div className={classes.legendItem}>
      <div className={classes.legendDot} />
      <LimitString value={name} length={40} />
    </div>
  );
};

type DetailsDonutProps = {
  portions: number[];
  labels: string[];
  size: number;
};

const DetailsDonut: React.FC<DetailsDonutProps> = ({
  portions,
  labels,
  size,
}) => {
  const classes = useStyles({ color: '' });
  const { t } = useTranslation();

  // all possible colors that this graph can use
  const colors: string[] = [
    '#008FFB',
    '#00E396',
    '#FF4560',
    '#775DD0',
    '#3f51b5',
    '#4caf50',
    '#f9ce1d',
    '#13d8aa',
    '#c7f464',
    '#81D4FA',
    '#f9a3a4',
    '#f9a3a4',
    '#F86624',
    '#2E294E',
    '#1B998B',
    '#662E9B',
    '#8D5B4C',
    '#A300D6',
  ];

  const options = {
    tooltip: {
      y: {
        formatter: roundAxis,
      },
    },
    labels,
    // chart: {
    //   offsetX: graphOffsetX,
    // },
    colors,
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    // this scales the chart at certain break points to make
    // sure the chart stays visible at all screen sizes
    // responsive: [
    //   {
    //     breakpoint: 10000,
    //     options: {
    //       chart: {
    //         height: size,
    //       },
    //       legend: {
    //         show: true,
    //         position: 'right',
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1550,
    //     options: {
    //       chart: {
    //         height: size / 1.5,
    //       },
    //       legend: {
    //         show: true,
    //         position: 'right',
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 1100,
    //     options: {
    //       chart: {
    //         height: size / 1.5,
    //       },
    //       legend: {
    //         show: showLegendOnScale,
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // ],
  };

  // not including 'other ...'
  const legendLength = 5;

  const legendItems: JSX.Element[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < labels.length; i++) {
    legendItems[i] = (
      <LegendItem key={i} name={labels[i]} color={colors[i % colors.length]} />
    );
  }

  const shownLegendItems: JSX.Element[] = legendItems.slice(
    0,
    legendLength - 1
  );
  const hiddenLegendItems: JSX.Element[] = legendItems.slice(legendLength);

  return (
    <>
      <div className={classes.chart}>
        <Chart
          options={options}
          series={portions}
          type="donut"
          height={size}
          width="100%"
        />
      </div>
      <div className={classes.legend}>
        {shownLegendItems}
        {!!hiddenLegendItems.length && (
          <Tooltip title={hiddenLegendItems}>
            <span>{t('portfolio.details.other')}</span>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default DetailsDonut;
