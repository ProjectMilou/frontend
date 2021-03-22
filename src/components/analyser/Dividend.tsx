import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DividendsChart from "../shared_components/DividendsChart";
import DonutChart from '../shared_components/DonutChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    indented: {
        paddingLeft: theme.spacing(7),
    },
    rowC: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-evenly'
    }
  }),
);

const Dividend: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.indented}>
            <h1>Dividends</h1>
            <div className={classes.rowC}>
                <DividendsChart/>
                <DonutChart/>
            </div>
        </div>
    )
} 
    
    
export default Dividend