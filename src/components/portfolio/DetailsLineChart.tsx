import React, { useState } from 'react';
import Chart from 'react-apexcharts';

type DetailsLineChartProps = {
  portfolioValue: number[];
};

const DetailsLineChart: React.FC<DetailsLineChartProps> = ({
  portfolioValue,
}) => {
  const [state, setState] = useState({
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
        width="50%"
      />
    </div>
  );
};
export default DetailsLineChart;
