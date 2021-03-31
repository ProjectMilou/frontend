import React, { useState } from 'react';
import Chart from 'react-apexcharts';

type DetailsLineChartProps = {
  portfolioValue: number[];
};

const DetailsLineChart: React.FC<DetailsLineChartProps> = ({
  portfolioValue,
}) => {
  const [state] = useState({
    series: [
      {
        name: 'Portfolio value',
        data: portfolioValue,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        foreColor: '#fff',
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Portfolio Movement',
        align: 'left',
        style: {
          color: '#fff',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
          'Jan',
        ],
      },
    },
  });

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
        width="100%"
      />
    </div>
  );
};
export default DetailsLineChart;
