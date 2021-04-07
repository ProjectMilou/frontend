import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// stylesheet for the analyst section
const useStyles = makeStyles(() =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    analystWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
    barContainer: {
      position: 'relative',
      width: '90%',
      height: '3rem',
      margin: '1rem auto',
      background:
        'linear-gradient(90deg, rgba(204,0,0,0.9) 0%, rgba(218,150,0,0.9) 50%, rgba(0,187,9,0.9) 100%)',
    },
    barIndicator: {
      position: 'absolute',
      width: '1rem',
      height: '100%',
      margin: '0 0.05rem',
      backgroundColor: 'orchid',
    },
  })
);

type DetailsMainAnalystProps = {
  // props
};

// returns the details page header
const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = () => {
  const classes = useStyles();

  const mock = [
    { name: 'bmw', score: 0.2 },
    { name: 'mercedes', score: 0.4 },
    { name: 'qqq', score: 1 },
    { name: 't1', score: 0.6 },
    { name: 't2', score: 0.8 },
  ];

  return (
    <div className={classes.analystWrapper}>
      {/* body placeholder */}
      <div className={classes.barContainer}>
        {mock.map((m) => (
          <Tooltip title={`${m.name}: ${m.score}`}>
            <div
              className={classes.barIndicator}
              style={{ left: `${m.score * 100}%` }}
            />
          </Tooltip>
        ))}

        <Tooltip title={`test2: ${0.6 * 100}%`}>
          <div
            className={classes.barIndicator}
            style={{ left: `${0.61 * 100}%` }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DetailsMainAnalyst;
