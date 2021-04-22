import React from 'react';
import {
    makeStyles,
    createStyles,
  } from '@material-ui/core';
import { Stock } from '../../analyser/APIClient';


type LogoProps = {
    stockOverview: Stock;
}

const useStyles = makeStyles(() =>
  createStyles({
    image: {
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        maxWidth: '100%',
      },
})
);

const CompanyLogo: React.FC<LogoProps> = ({
    stockOverview,
  }) => {
    const classes = useStyles();

    return (
        <div>
            <img
                className={classes.image}
                alt="../../assets/images/logo1.png"
                src={stockOverview.picture.toString()}
              />
        </div>   
    );
};

export default CompanyLogo;