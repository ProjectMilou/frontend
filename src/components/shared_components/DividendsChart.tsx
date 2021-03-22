import Box from '@material-ui/core/Box'
import React from 'react'
import Chart from 'react-apexcharts'


 const options = {
    options: {
        colors: ['#F6AE2D','#5DE78E','#4392F1', ],
        chart: {
          id: "line-chart",
          toolbar: {
            show: false,
          },
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
      padding: {
        
      },
      series: [
        {
          name: "Dividends",
          data: [30, 40, 45, 50, 49]
        }
      ]
 }


 const DividendsChart: React.FC = () => 
 (
     <div>
        <Box  m={10}>
         <Chart options={options.options} 
         series={options.series} 
         type="line"
         width= "900px"
         min-width="800px"
         height={350} />
         </Box>
      </div>
     
 )

export default DividendsChart
