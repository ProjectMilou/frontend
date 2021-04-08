import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    updateButton: {
      backgroundColor: palette.primary.light,
      color: palette.primary.contrastText,
      alignSelf: 'baseline',
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

  const [selectedFrom, setSelectedFrom] = React.useState<string>('');
  const [selectedTo, setSelectedTo] = React.useState<string>('');
  const [inputValid, setInputValid] = React.useState<boolean>(true);
  const [backtesting, setBacktesting] = React.useState<Backtesting>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const isMounted = React.useRef(true);

  // TODO delete when real api works
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockFetch = async (from: number, to: number) => {
    setError(undefined);
    try {
      setTimeout(() => {
        if (isMounted.current) {
          const backtestingMock: Backtesting = {
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
          setBacktesting(backtestingMock);
        }
      }, 2000);
    } catch (e) {
      if (isMounted.current) {
        setError(e);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetch = async (from: number, to: number) => {
    setError(undefined);
    try {
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

  // on initial mount
  useEffect(() => {
    // default range is from two years back to one year back
    const today = Date.now();
    const twoYearsBack = new Date(today - 63113904000);
    const oneYearBack = new Date(today - 31556952000);
    setSelectedFrom(twoYearsBack.toISOString().split('T')[0]);
    setSelectedTo(oneYearBack.toISOString().split('T')[0]);
    mockFetch(Date.parse(selectedFrom), Date.parse(selectedTo));
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickUpdate = () => {
    // remove error from last click
    setInputValid(true);
    const from = Date.parse(selectedFrom);
    const to = Date.parse(selectedTo);
    if (to < from || Date.now() < to) {
      setInputValid(false);
    } else {
      mockFetch(Date.parse(selectedFrom), Date.parse(selectedTo));
    }
  };

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
            helperText={
              inputValid
                ? undefined
                : t('portfolio.details.backtesting.dateHelperText')
            }
            error={!inputValid}
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
          <Button
            className={classes.updateButton}
            variant="contained"
            onClick={onClickUpdate}
          >
            {t('portfolio.details.backtesting.updateButton')}
          </Button>
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
