import React from 'react';
import { makeStyles } from '@material-ui/core';
import DetailsHeader from './DetailsHeader';

export type DetailsProps = {
    back: ()=>void
  };

const useStyles = makeStyles({
    topBanner: {
        backgroundColor: '#EEF1FB',
        width: '100%',
        height: '15rem',
    },
    main: {
        backgroundColor: '#0d1b3b',
        width: '100%',
        height: '15rem',
    },
  });

const Details: React.FC<DetailsProps> = ({ back }) => {
    const classes = useStyles();
    
    return (
        <div>
            <section className={classes.topBanner}>
                <DetailsHeader back = {back}/>
            </section>
            <section className={classes.main}>
                <div/>
            </section>
        </div>
    );
}

export default Details;