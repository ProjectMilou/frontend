import React from 'react';
import { FormControlLabel, Radio, Paper, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import InfoButton from './InfoButton';

/**
 * Allowed key figures.
 *
 * These localization keys must exist for each `keyFigure`:
 *
 * * `analyser.detail.keyfigure.${keyFigure}.title`
 * * `analyser.detail.keyfigure.${keyFigure}.definition`
 */
export type KeyFigure = 'PER' | 'PBR' | 'PEGR' | 'EPS';

export type KeyFigureSelectProps = {
  keyFigure: KeyFigure;
  value?: React.ReactNode;
  selected: boolean;
  select: (keyFigure: KeyFigure) => void;
  dark?: boolean;
};

const useStyles = makeStyles((theme) => ({
  keyFigureSelect: {
    padding: theme.spacing(0.5),
    display: 'flex',
    fontSize: '1rem',
  },
  dark: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  input: {
    flex: '1',
    marginLeft: '0px',
  },
  item: {
    flex: '0',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: theme.spacing(1),
  },
  radio: {
    color: theme.palette.common.black,
  },
  radioDark: {
    color: theme.palette.primary.contrastText,
  },
}));

export const KeyFigureSelect: React.FC<KeyFigureSelectProps> = ({
  keyFigure,
  value,
  selected,
  select,
  dark,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Paper
      className={classNames(classes.keyFigureSelect, dark && classes.dark)}
    >
      <FormControlLabel
        control={
          <Radio
            checked={selected}
            onChange={() => select(keyFigure)}
            color="default"
            className={dark ? classes.radioDark : classes.radio}
          />
        }
        label={t(`analyser.detail.keyfigure.${keyFigure}.title`)}
        className={classes.input}
      />
      {value !== undefined && <div className={classes.item}>{value}</div>}
      <div className={classes.item}>
        <InfoButton
          infotext={t(`analyser.detail.keyfigure.${keyFigure}.definition`)}
        />
      </div>
    </Paper>
  );
};
