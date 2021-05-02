import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { KeyFigure, KeyFigureSelect } from './KeyFigureSelect';
import KeyFiguresChart from './KeyFiguresChart';
import StyledNumberFormat from './StyledNumberFormat';

// KeyFIguresBar props type declaration
type KeyFiguresBarProps = {
  keyFigures: { [keyFigure in KeyFigure]: number[] };
  years: number[];
  dark?: boolean;
  chartHeight: number;
  outlined?: boolean;
};

const useStyles = makeStyles({
  grid: {
    marginBottom: '25px',
  },
});

/**
 * @param keyFigures - Data about key figures (P/E, P/B, PEGR, EPS)
 * @param years - Years of the keyfigures data
 * @param dark - If one key figure is selected
 * @param chartHeight - Height of the chart
 * @param outlined -
 * @return Main body of key figures section, includes KeyFiguresSelect and KeyFiguresChart
 */
const KeyFiguresBar: React.FC<KeyFiguresBarProps> = ({
  keyFigures,
  years,
  dark,
  chartHeight,
  outlined,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [selectedSeries, setSelectedSeries] = React.useState<KeyFigure>('PER');

  return (
    <div>
      <Grid container spacing={2} className={classes.grid}>
        {Object.entries(keyFigures).map(([keyFigure, values]) => {
          const latestValue = values[values.length - 1];
          return (
            <Grid item md={6} xs={12} key={keyFigure}>
              <KeyFigureSelect
                keyFigure={keyFigure as KeyFigure}
                value={
                  keyFigure === 'EPS' && latestValue !== undefined ? (
                    <StyledNumberFormat value={latestValue} suffix="€" />
                  ) : (
                    <StyledNumberFormat value={latestValue} />
                  )
                }
                selected={selectedSeries === keyFigure}
                select={setSelectedSeries}
                dark={dark}
                outlined={outlined ? 'outlined' : 'elevation'}
              />
            </Grid>
          );
        })}
      </Grid>
      <KeyFiguresChart
        height={chartHeight}
        series={{
          name: t(`analyser.detail.keyfigure.${selectedSeries}.title`),
          data: keyFigures[selectedSeries],
        }}
        years={years}
        dark={dark}
      />
    </div>
  );
};
export default KeyFiguresBar;
