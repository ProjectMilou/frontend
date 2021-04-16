import React from 'react';
import {
    makeStyles,
    createStyles,
    useTheme,
    Paper,
    Theme,
  } from '@material-ui/core';

import StockChart from '../../shared/StockChart';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        margin: theme.spacing(1.5),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper
    }
  })
);



// type declarations
type DetailsStockChartProps = {
  stockPerformance: number[][]
  setPerformanceAll:  React.Dispatch<React.SetStateAction<boolean>>
};

const DetailsStockChart: React.FC<DetailsStockChartProps> = ({
    stockPerformance,
    setPerformanceAll
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper className={classes.paper} variant="outlined">
    <StockChart
                series={stockPerformance}
                setPerformanceAll={setPerformanceAll}
                axisColor={theme.palette.secondary.contrastText}
                buttonBackgroundColor={theme.palette.lightBlue.main}
                buttonTextColor={theme.palette.primary.contrastText}
                height={450}
              />
    </Paper>
);

  }

export default DetailsStockChart;