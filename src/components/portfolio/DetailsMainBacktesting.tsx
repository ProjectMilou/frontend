import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DetailsMainBacktestingTimeline from './DetailsMainBacktestingTimeline';

// stylesheet for the backtesting section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    backtestingWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      color: palette.primary.contrastText,
      fontSize: '1.25rem',
      margin: 0,
    },
    datePicker: {
      marginTop: '2rem',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    textField: {
      marginLeft: '1rem',
      marginRight: '2rem',
      width: 180,
      color: palette.primary.contrastText,
      '& .MuiInputBase-root.Mui-disabled': {
        color: palette.primary.contrastText,
        opacity: 0.6,
      },
      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.primary.contrastText,
      },
    },
    innerText: {
      color: palette.primary.contrastText,
      opacity: 0.9,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.primary.contrastText,
        opacity: 0.9,
      },
      '&:hover': {
        opacity: 1,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary.contrastText,
          opacity: 1,
        },
      },
    },
  })
);

// TODO delete and replace with actual api data
const mockStartDate = new Date('01.01.2020');
const mockStartValue = 840.56;
const mockMinDate = new Date('03.04.2020');
const mockMinValue = 512.67;
const mockMaxDate = new Date('10.02.2020');
const mockMaxValue = 1250.55;
const mockEndDate = new Date('12.31.2020');
const mockEndValue = 970.43;

// type declarations
type DetailsMainBacktestingProps = {
  // props
};

// returns the details page header
const DetailsMainBacktesting: React.FC<DetailsMainBacktestingProps> = () => {
  const classes = useStyles();

  const [selectedFrom, setSelectedFrom] = React.useState<string>('');
  const [selectedTo, setSelectedTo] = React.useState<string>('');

  return (
    <div className={classes.backtestingWrapper}>
      <p className={classes.subtitle}>
        {/* TODO: use translation */}
        Here you can see how your portfolio would have performed in the past
      </p>
      <div className={classes.datePicker}>
        {/* TODO: use translation */}
        <form className={classes.form} noValidate>
          <p className={classes.subtitle}>From:</p>
          <TextField
            disabled
            id="dateFrom"
            type="date"
            value={selectedFrom}
            variant="outlined"
            onChange={(e) => setSelectedFrom(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              className: classes.innerText,
            }}
            InputProps={{
              className: classes.innerText,
            }}
          />
          <p className={classes.subtitle}>To:</p>
          <TextField
            id="dateTo"
            type="date"
            value={selectedTo}
            variant="outlined"
            onChange={(e) => setSelectedTo(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              className: classes.innerText,
            }}
            InputProps={{
              className: classes.innerText,
            }}
          />
        </form>
        {/* TODO: use translation */}
        <DetailsMainBacktestingTimeline
          startDate={mockStartDate}
          startValue={mockStartValue}
          minDate={mockMinDate}
          minVale={mockMinValue}
          maxDate={mockMaxDate}
          maxValue={mockMaxValue}
          endDate={mockEndDate}
          endValue={mockEndValue}
        />
      </div>
    </div>
  );
};

export default DetailsMainBacktesting;
