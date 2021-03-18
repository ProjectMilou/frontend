import React from 'react'
import Chart from 'react-apexcharts'


 const options = {
    options: {
        colors: ['#F6AE2D','#5DE78E','#4392F1', ],
        chart: {
          id: "line-chart"
        },
        xaxis: {
          categories: [2016, 2017, 2018, 2019, 2020]
        },
        markers: {
            size: 5,
        },
        stroke: {
            width: 2
          }
      },
      series: [
        {
          name: "Dividends",
          data: [30, 40, 45, 50, 49]
        }
      ]
 }


 const TimsChart: React.FC = () => 
 (
     <div>
         <h1>TimsChart</h1>
         <Chart options={options.options} 
         series={options.series} 
         type="line" 
         width={500} height={320} />
         </div>
     
 )

export default TimsChart
