import React from 'react';
import Chart from 'react-apexcharts';
import { createStyles, useTheme, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import StyledNumberFormat from '../shared/StyledNumberFormat';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    standardDeviationWrapper: {
      color: palette.primary.contrastText,
      marginBottom: '2em',
      fontSize: '1.5em',
    },
    standardDeviationValue: {
      marginLeft: '1em',
    },
  })
);

type MappedCorrelation = [string, string, number];

type HeatMapSeries = {
  name: string;
  // the order of which number represents which company is always the same
  data: number[];
};

type HeatmapProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

const Heatmap: React.FC<HeatmapProps> = ({ portfolio, height }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { correlations } = portfolio.analytics;

  // array of arrays of symbol - symbol - correlation
  const mappedCorrelations: MappedCorrelation[] = Object.keys(
    correlations
  ).map((key) => [key.split(';')[0], key.split(';')[1], correlations[key]]);

  // gets unique set of companies displayed in the chart (used as x-axis categories)
  const chartCategories = Array.from(
    new Set(
      mappedCorrelations
        .map((mc) => [mc[0], mc[1]])
        .reduce((arr1, arr2) => arr1.concat(arr2))
        .sort()
    )
  );

  // will be passed to the chart as series prop
  const finalSeries: HeatMapSeries[] = [];

  chartCategories.forEach((c1) => {
    const currentSeries: HeatMapSeries = {
      name: c1,
      data: [],
    };
    chartCategories.forEach((c2) => {
      // the correlation of a company to itself is 1
      if (c1 === c2) currentSeries.data.push(1);
      else {
        /* check if c1 + c2 are present as a pair in the mappedCorrelations ignoring order
         if present push the corresponding correlation value, if no match is found place default value 0
         it is mandatory that each series has the same amount and order of ordered values to display a meaningful x-Axis in the chart */
        let valueToPush = 0;
        mappedCorrelations.forEach((mc) => {
          if (
            JSON.stringify([c1, c2].sort()) ===
            JSON.stringify(mc.slice(0, 2).sort())
          )
            // eslint-disable-next-line prefer-destructuring
            valueToPush = mc[2];
        });
        currentSeries.data.push(valueToPush);
      }
    });
    finalSeries.push(currentSeries);
  });

  const options = {
    legend: {
      labels: {
        colors: theme.palette.primary.contrastText,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.8,
        // TODO sadly true does not work as expected, apex bug?
        reverseNegativeShade: false,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: 0,
              color: theme.palette.error.main,
              foreColor: theme.palette.primary.main,
              name: t('portfolio.details.analytics.correlations.negative'),
            },
            {
              from: 0,
              to: 1,
              color: theme.palette.success.main,
              foreColor: theme.palette.primary.main,
              name: t('portfolio.details.analytics.correlations.positive'),
            },
          ],
        },
      },
    },
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: t('portfolio.details.analytics.correlations.chartTitle'),
      style: {
        color: theme.palette.primary.contrastText,
      },
    },
    xaxis: {
      categories: chartCategories,
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
  };

  return (
    <Chart
      type="heatmap"
      height={height}
      series={finalSeries}
      options={options}
    />
  );
};

type DetailsMainAnalyticsCorrelationsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalyticsCorrelations: React.FC<DetailsMainAnalyticsCorrelationsProps> = ({
  portfolio,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <div className={classes.standardDeviationWrapper}>
        <span>{t('portfolio.details.analytics.standardDeviation')}</span>
        <span className={classes.standardDeviationValue}>
          <StyledNumberFormat
            value={portfolio.analytics.standardDeviation * 100}
            suffix="%"
          />
        </span>
      </div>
      <Heatmap portfolio={portfolio} height={350} />
    </div>
  );
};

export default DetailsMainAnalyticsCorrelations;
