import React, { useEffect, useReducer } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Container, CircularProgress } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
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
    datePickerInput: {
      marginLeft: '1rem',
      marginRight: '2rem',
      width: 180,
      color: palette.primary.contrastText,
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

type State = {
  selectedFrom: Date;
  selectedTo: Date;
  inputValid: boolean;
  backtesting: Backtesting | undefined;
  error: Error | undefined;
};

// default range is from two years back to one year back
const today = Date.now();
const twoYearsBack = new Date(today - 63113904000);
const oneYearBack = new Date(today - 31556952000);
const initialState: State = {
  selectedFrom: twoYearsBack,
  selectedTo: oneYearBack,
  inputValid: true,
  backtesting: undefined,
  error: undefined,
};

type SetFromAction = {
  type: 'setFrom';
  payload: Date;
};

type SetToAction = {
  type: 'setTo';
  payload: Date;
};

type SetValidAction = {
  type: 'setValid';
  payload: boolean;
};

type SetBacktestingAction = {
  type: 'setBacktesting';
  payload: Backtesting | undefined;
};

type SetErrorAction = {
  type: 'setError';
  payload: Error | undefined;
};

type Actions =
  | SetFromAction
  | SetToAction
  | SetValidAction
  | SetBacktestingAction
  | SetErrorAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'setFrom':
      return { ...state, selectedFrom: action.payload };
    case 'setTo':
      return { ...state, selectedTo: action.payload };
    case 'setValid':
      return { ...state, inputValid: action.payload };
    case 'setBacktesting':
      return { ...state, backtesting: action.payload };
    case 'setError':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const DetailsMainBacktesting: React.FC<DetailsMainBacktestingProps> = ({
  token,
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = React.useRef(true);

  // TODO delete when real api works
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockFetch = async (from: Date, to: Date) => {
    dispatch({ type: 'setError', payload: undefined });
    try {
      if (isMounted.current) {
        const backtestingMock: Backtesting = {
          MDDMaxToMin: -65,
          MDDInitialToMin: -65,
          dateMax: new Date('2019-02-10'),
          dateMin: new Date('2020-03-04'),
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
        setTimeout(
          () => dispatch({ type: 'setBacktesting', payload: backtestingMock }),
          2000
        );
      }
    } catch (e) {
      if (isMounted.current) {
        dispatch({ type: 'setError', payload: e });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetch = async (from: Date, to: Date) => {
    dispatch({ type: 'setError', payload: undefined });
    try {
      const backTestingResponse = await API.backtesting(token, id, from, to);
      if (isMounted.current) {
        dispatch({ type: 'setBacktesting', payload: backTestingResponse });
      }
    } catch (e) {
      if (isMounted.current) {
        dispatch({ type: 'setError', payload: e });
      }
    }
  };

  // on initial mount
  useEffect(() => {
    mockFetch(state.selectedFrom, state.selectedTo);
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickUpdate = () => {
    console.log('ALLARE');
    // remove error from last click
    dispatch({ type: 'setValid', payload: true });
    if (
      state.selectedTo < state.selectedFrom ||
      new Date() < state.selectedTo
    ) {
      dispatch({ type: 'setValid', payload: false });
    } else {
      dispatch({ type: 'setBacktesting', payload: undefined });
      mockFetch(state.selectedFrom, state.selectedTo);
    }
  };

  return (
    <div className={classes.backtestingWrapper}>
      <h2 className={classes.subtitle}>
        {t('portfolio.details.backtesting.subheading')}
      </h2>
      <div className={classes.datePicker}>
        <form className={classes.form} noValidate>
          <span className={classes.subtitle}>
            {t('portfolio.details.from')}:
          </span>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              InputProps={{ className: classes.datePickerInput }}
              value={state.selectedFrom}
              onChange={(date) =>
                dispatch({
                  type: 'setFrom',
                  // if the onchange date is null don't change the state
                  payload: date ? date.toDate() : state.selectedFrom,
                })
              }
            />
          </MuiPickersUtilsProvider>
          <span className={classes.subtitle}>{t('portfolio.details.to')}:</span>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              InputProps={{
                className: classes.datePickerInput,
              }}
              helperText={
                state.inputValid
                  ? undefined
                  : t('portfolio.details.backtesting.dateHelperText')
              }
              error={!state.inputValid}
              value={state.selectedTo}
              onChange={(date) =>
                dispatch({
                  type: 'setTo',
                  // if the onchange date is null don't change the state
                  payload: date ? date.toDate() : state.selectedFrom,
                })
              }
            />
          </MuiPickersUtilsProvider>
          <Button
            className={classes.updateButton}
            variant="contained"
            onClick={() => onClickUpdate()}
          >
            {t('portfolio.details.backtesting.updateButton')}
          </Button>
        </form>
      </div>
      {!state.backtesting && !state.error && (
        <CircularProgress color="secondary" />
      )}
      {/* TODO maybe replace with ternary operator instead of conditional error and conditional backtesting */}
      {state.error && (
        <Container className={classes.container}>
          <ErrorMessage
            error={state.error}
            messageKey="portfolio.details.backtesting.errorMessage"
          />
        </Container>
      )}
      {state.backtesting && (
        <div className={classes.timelineListWrapper}>
          <DetailsMainBacktestingTimeline
            startDate={state.selectedFrom}
            startValue={state.backtesting.initialValue}
            minDate={state.backtesting.dateMin}
            minVale={state.backtesting.minValue}
            maxDate={state.backtesting.dateMax}
            maxValue={state.backtesting.maxValue}
            endDate={state.selectedTo}
            endValue={state.backtesting.finalPortfolioBalance}
          />
          <DetailsMainBacktestingList
            changeBest={state.backtesting.bestYear.changeBest}
            changeWorst={state.backtesting.worstYear.changeWorst}
            mddMaxToMin={state.backtesting.MDDMaxToMin}
            standardDeviation={state.backtesting.standardDeviation}
            sharpeRatio={state.backtesting.sharpeRatio}
            cagr={state.backtesting.CAGR}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsMainBacktesting;
