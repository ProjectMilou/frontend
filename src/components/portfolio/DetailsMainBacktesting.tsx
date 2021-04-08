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

  const [inputValid, setInputValid] = React.useState<boolean>(true);
  const [backtesting, setBacktesting] = React.useState<Backtesting>();
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const isMounted = React.useRef(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // for validation of input fields
  useEffect(() => {
    const from = Date.parse(selectedFrom);
    const to = Date.parse(selectedTo);
    if (to < from || Date.now() < to) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [selectedFrom, selectedTo]);

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
            disabled={!inputValid}
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
