import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
      color: palette.primary.contrastText,
    },
  })
);

// type declarations
type DetailsMainBacktestingProps = {
  // props
};

// returns the details page header
const DetailsMainBacktesting: React.FC<DetailsMainBacktestingProps> = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18')
  );

  return (
    <div className={classes.backtestingWrapper}>
      <p className={classes.subtitle}>
        {/* TODO: use translation */}
        Here you can see how your portfolio would have performed in the past
      </p>
      <div>
        {/* TODO: use translation */}
        <form noValidate>
          <TextField
            id="date"
            label="From"
            type="date"
            value={selectedDate}
            style={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        {/* TODO: use translation */}
      </div>
    </div>
  );
};

export default DetailsMainBacktesting;
