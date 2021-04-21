import React, { useEffect, useReducer } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  darken,
} from '@material-ui/core/styles';
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
      alignItems: 'baseline',
    },
    datePickerInput: {
      marginLeft: '1rem',
      marginRight: '2rem',
      width: 180,
      color: palette.primary.contrastText,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${darken(palette.primary.contrastText, 0.2)}`,
      },
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary.contrastText,
        },
      },
    },
    updateButton: {
      backgroundColor: palette.primary.light,
      color: palette.primary.contrastText,
      alignSelf: 'baseline',
    },
    innerButton: {
      color: palette.primary.contrastText,
    },
    helperText: {
      position: 'absolute',
      top: '100%',
      left: '-60%',
      whiteSpace: 'nowrap',
    },
    timelineListWrapper: {
      display: 'flex',
      marginTop: '1em',
    },
    errorContainer: {
      marginTop: '25px',
    },
    progressContainer: {
      height: '25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

type DetailsMainBacktestingProps = {
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
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = React.useRef(true);

  const fetch = async (from: Date, to: Date) => {
    dispatch({ type: 'setError', payload: undefined });
    try {
      const backTestingResponse = await API.backtesting(id, from, to);
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
    fetch(state.selectedFrom, state.selectedTo);
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickUpdate = () => {
    // remove error from last click
    dispatch({ type: 'setValid', payload: true });
    if (
      state.selectedTo < state.selectedFrom ||
      new Date() < state.selectedTo
    ) {
      dispatch({ type: 'setValid', payload: false });
    } else {
      dispatch({ type: 'setBacktesting', payload: undefined });
      fetch(state.selectedFrom, state.selectedTo);
    }
  };

  return (
    <div className={classes.backtestingWrapper}>
      <h2 className={classes.subtitle}>
        {t('portfolio.details.backtesting.subheading')}
      </h2>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.datePicker}>
          <form className={classes.form} noValidate>
            <span className={classes.subtitle}>
              {t('portfolio.details.from')}:
            </span>
            <KeyboardDatePicker
              inputVariant="outlined"
              format="MM/DD/YYYY"
              InputProps={{ className: classes.datePickerInput }}
              KeyboardButtonProps={{ className: classes.innerButton }}
              error={!state.inputValid}
              value={state.selectedFrom}
              onChange={(date) => {
                // if the onchange date is null don't change the state
                if (date !== null) {
                  dispatch({
                    type: 'setFrom',
                    payload: date.toDate(),
                  });
                }
              }}
              disableFuture
            />
            <span className={classes.subtitle}>
              {t('portfolio.details.to')}:
            </span>
            <KeyboardDatePicker
              inputVariant="outlined"
              format="MM/DD/YYYY"
              InputProps={{ className: classes.datePickerInput }}
              KeyboardButtonProps={{ className: classes.innerButton }}
              FormHelperTextProps={{ className: classes.helperText }}
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
              disableFuture
            />

            <Button
              className={classes.updateButton}
              variant="contained"
              disabled={!state.backtesting && !state.error}
              onClick={() => onClickUpdate()}
            >
              {t('portfolio.details.backtesting.updateButton')}
            </Button>
          </form>
        </div>
      </MuiPickersUtilsProvider>
      {!state.backtesting && !state.error && (
        <div className={classes.progressContainer}>
          <CircularProgress color="secondary" size={60} />
        </div>
      )}
      {state.error && (
        <Container className={classes.errorContainer}>
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
            minValue={state.backtesting.minValue}
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
