import React from 'react';
import Chart from 'react-apexcharts';

export type Series = {
  name: string;
  data: number[];
};


const BalanceSheetInfo: React.FC = (
) => {
  const options = {
      series: [
        {
          data: [
            {
              x: "New Delhi",
              y: 218,
            },
            {
              x: "Kolkata",
              y: 149,
            },
            {
              x: "Mumbai",
              y: 184,
            },
            {
              x: "Ahmedabad",
              y: 55,
            },
            {
              x: "Bangaluru",
              y: 84,
            },
            {
              x: "Pune",
              y: 31,
            },
            {
              x: "Chennai",
              y: 70,
            }
          ],
        },
      ],
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Basic Treemap'
      },
  }; 
  
  
  return (
    <div>
      <Chart
        options={options}
        series={options.series}
      />

    </div>
  );
};

export default BalanceSheetInfo;
