import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import StyledNumberFormat from './StyledNumberFormat';
import InfoButton from './InfoButton';

export type TextOverTextProps = {
  top: string;
  bottom: string;
  currency?: string;
  sizeTop?: string;
  sizeBottom?: string;
  fontWeightTop?: number;
  fontWeightBottom?: number;
  colorTop?: string;
  colorBottom?: string;
  alignment?: string;
  infoText?: string;
};

const useStyles = makeStyles<Theme, TextOverTextProps, string>(
  ({ palette }: Theme) =>
    createStyles({
      top: {
        margin: 0,
        fontSize: (props) => props.sizeTop || '1rem',
        fontWeight: (props) => props.fontWeightTop || 600,
        color: (props) => props.colorTop || palette.primary.main,
      },
      bottom: {
        margin: 0,
        fontSize: (props) => props.sizeBottom || '1rem',
        fontWeight: (props) => props.fontWeightBottom || 600,
        color: (props) => props.colorBottom || palette.primary.main,
      },
      compContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      pWrapper: {
        display: 'flex',
        justifyContent: (props) => props.alignment || 'center',
      },
    })
);

const TextOverText: React.FC<TextOverTextProps> = (props) => {
  const { top, bottom, currency, infoText } = props;
  const classes = useStyles(props);

  function currencySymbol(): '€' | '$' {
    if (currency === 'USD') {
      return '$';
    }
    return '€';
  }

  return (
    <div className={classes.compContainer}>
      <div className={classes.pWrapper}>
        <p className={classes.top}>{top}</p>
      </div>
      {!currency && (
        <div className={classes.pWrapper}>
          <p className={classes.bottom}>{bottom}</p>
          {infoText && (
            <>
              &nbsp;
              <InfoButton infotext={infoText} />
            </>
          )}
        </div>
      )}
      {!!currency && (
        <div className={classes.pWrapper}>
          <p className={classes.bottom}>
            <StyledNumberFormat
              value={parseInt(bottom, 10)}
              suffix={currencySymbol()}
              fontWeight={600}
              size="1.3rem"
            />
            {infoText && (
              <>
                &nbsp;
                <InfoButton infotext={infoText} />
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextOverText;
