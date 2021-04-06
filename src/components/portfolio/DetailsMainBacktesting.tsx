import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import DetailsMainBacktestingTimeline from './DetailsMainBacktestingTimeline';
import { Backtesting } from '../../portfolio/APIClient';
import DetailsMainBacktestingList from './DetailsMainBacktestingList';
import * as API from '../../portfolio/APIClient';
import ErrorMessage from '../shared/ErrorMessage';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    backtestingWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
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
    timelineListWrapper: {
      display: 'flex',
      marginTop: '1em',
    },
    container: {
      marginTop: '25px',
    },
  })
);

type DetailsMainBacktestingProps = {
  token: string;
  id: string;
};

const DetailsMainBacktesting: React.FC<DetailsMainBacktestingProps> = ({
  token,
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // default range is from two years back to one year back
  const today = Date.now();
  const twoYearsBack = new Date(today - 63113904000);
  const oneYearBack = new Date(today - 31556952000);
  const [selectedFrom, setSelectedFrom] = React.useState<string>(
    twoYearsBack.toISOString().split('T')[0]
  );
  const [selectedTo, setSelectedTo] = React.useState<string>(
    oneYearBack.toISOString().split('T')[0]
  );

  const [helperText, setHelperText] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [backtesting, setBacktesting] = React.useState<Backtesting>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const isMounted = React.useRef(true);

  const fetch = async (from: number, to: number) => {
    setError(undefined);
    try {
      // TODO get real token and id from useContext
      const backTestingResponse = await API.backtesting(token, id, from, to);
      if (isMounted.current) {
        setBacktesting(backTestingResponse);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
      }
    }
  };

  useEffect(() => {
    const from = Date.parse(selectedFrom);
    const to = Date.parse(selectedTo);
    if (to < from || Date.now() < to) {
      setHelperText(t('portfolio.details.backtesting.dateHelperText'));
    } else {
      setHelperText('');
      setDisabled(true);
      // TODO do API call, call setBacktesting and then enable fields again
      // TODO replace mock with actual api call
      // fetch(from, to);
      const backtestingInit: Backtesting = {
        MDDMaxToMin: -65,
        MDDInitialToMin: -65,
        dateMax: '10.02.2019',
        dateMin: '03.04.2020',
        maxValue: 1250.55,
        minValue: 512.67,
        initialValue: 840.56,
        bestYear: {
          changeBest: 210.5,
          yearBest: '2020',
          growthRateBest: 10.5,
        },
        worstYear: {
          changeWorst: -70.56,
          yearWorst: '2019',
          growthRateWorst: -5.6,
        },
        finalPortfolioBalance: 970.43,
        CAGR: 5.42,
        standardDeviation: 12.1,
        sharpeRatio: 0.65,
      };
      setBacktesting(backtestingInit);

      setTimeout(() => setDisabled(false), 3000);
    }
    return () => {
      isMounted.current = false;
    };
  }, [selectedFrom, selectedTo, t]);

  return (
    <div className={classes.backtestingWrapper}>
      <p className={classes.subtitle}>
        {t('portfolio.details.backtesting.subheading')}
      </p>
      <div className={classes.datePicker}>
        <form className={classes.form} noValidate>
          <p className={classes.subtitle}>{t('portfolio.details.from')}:</p>
          <TextField
            id="dateFrom"
            type="date"
            disabled={disabled}
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
          <p className={classes.subtitle}>{t('portfolio.details.to')}:</p>
          <TextField
            id="dateTo"
            type="date"
            disabled={disabled}
            helperText={helperText}
            error={!(helperText === '')}
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
      </div>
      {/* TODO maybe replace with ternary operator instead of conditional error and conditional backtesting */}
      {error && (
        <Container className={classes.container}>
          <ErrorMessage
            error={error}
            messageKey="portfolio.details.backtesting.errorMessage"
          />
        </Container>
      )}
      {backtesting && (
        <div className={classes.timelineListWrapper}>
          <DetailsMainBacktestingTimeline
            startDate={selectedFrom}
            startValue={backtesting.initialValue}
            minDate={backtesting.dateMin}
            minVale={backtesting.minValue}
            maxDate={backtesting.dateMax}
            maxValue={backtesting.maxValue}
            endDate={selectedTo}
            endValue={backtesting.finalPortfolioBalance}
          />
          <DetailsMainBacktestingList
            changeBest={backtesting.bestYear.changeBest}
            changeWorst={backtesting.worstYear.changeWorst}
            mddMaxToMin={backtesting.MDDMaxToMin}
            standardDeviation={backtesting.standardDeviation}
            sharpeRatio={backtesting.sharpeRatio}
            cagr={backtesting.CAGR}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsMainBacktesting;
