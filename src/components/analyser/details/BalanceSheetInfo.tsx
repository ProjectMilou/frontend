import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export type Series = {
  name: string;
  data: number[];
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    infoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    MapWrapper: {
      width: '20rem',
      height: '20rem',
      display: 'block',
      marginLeft : 'auto',
      marginRight : 'auto'
    },
    titleContainer: {
      display: 'flex',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionSubTitle: {
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    boxTitles:{
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    }
  })
  );

const BalanceSheetInfo: React.FC = (
) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const seriesLeft = 
    [
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
    ]


    const seriesRight = 
    [
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
    ]
  const options = {
      legend: {
        show: false
      },
      chart: {
        height: 150,
        type: 'treemap',
        toolbar: {
          show: false,
        },
      },
  }; 
  
  
  return (
    <p>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
              {t('analyser.details.BalanceSheetHeader')}
          </h2>
        </div>
      </div>
        <div className={classes.infoContainer}>
          <div className={classes.MapWrapper}>
          <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h5 className={classes.boxTitles}>
              {t('analyser.details.BalanceSheet.Assets')}
          </h5>
        </div>
      </div>
            <Chart
              options={options}
              type='treemap'
              series={seriesLeft}
              height={350}
              width={350}
            />
          </div>
        <div className={classes.MapWrapper}> 
        <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h5 className={classes.boxTitles}>
              {t('analyser.details.BalanceSheet.Liabilities')}
          </h5>
        </div>
      </div>
          <Chart
            options={options}
            type='treemap'
            series={seriesRight}
            height={350}
            width={350}
           />
          </div>  
        </div>
    </p>
  );
};

export default BalanceSheetInfo;
