import React, { useState } from 'react';
import Chart from 'react-apexcharts';

type DetailsDonutProps = {
  portions: number[];
  names: string[];
};

const DetailsDonut: React.FC<DetailsDonutProps> = ({ portions, names }) => {
  const [state, setState] = useState({
    series: portions,
    options: {
      labels: names,
      chart: {
        redrawOnWindowResize: false,
        redrawOnParentResize: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  });

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={300}
        width="100%"
      />
    </div>
  );
};

export default DetailsDonut;
