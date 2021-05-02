import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
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

/**
 * This Component is used to display text over text in various locations 
 * @param props used to specify the style of the components for reuse in different locations 
 */
const TextOverText: React.FC<TextOverTextProps> = (props) => {
  const { top, bottom, currency, infoText } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.compContainer}>
      <div className={classes.pWrapper}>
        <Typography className={classes.top}>{top}</Typography>
      </div>
      {!currency && (
        <div className={classes.pWrapper}>
          <Typography className={classes.bottom}>{bottom}</Typography>
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
          <Typography className={classes.bottom}>
            <StyledNumberFormat
              value={parseInt(bottom, 10)}
              suffix="€"
              fontWeight={600}
              size="1.3rem"
            />
            {infoText && (
              <>
                &nbsp;
                <InfoButton infotext={infoText} />
              </>
            )}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TextOverText;
