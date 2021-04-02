import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core';

export type TextOverTextProps = {
    top: string;
    bottom: string;
    sizeTop?: string;
    sizeBottom?: string;
    fontWeightTop?: number;
    fontWeightBottom?: number;
    colorTop?: string;
    colorBottom?: string;
    alignment?: string;
  };

  const useStyles = makeStyles<Theme, TextOverTextProps, string>(({ palette }: Theme) =>
  createStyles({
    top: {
      margin: 0,
      fontSize: (props) => props.sizeTop || '1rem',
      fontWeight: (props)=> props.fontWeightTop || 600,
      color: (props)=> props.colorTop || palette.primary.main,
    },
    bottom: {
      margin: 0,
      fontSize: (props) => props.sizeBottom || '1rem',
      fontWeight: (props)=> props.fontWeightBottom || 600,
      color: (props)=> props.colorBottom || palette.primary.main,
    },
    compContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    pWrapper: {
        display: 'flex',
        justifyContent: (props)=> props.alignment||'center',
    },  
})
);

const TextOverText: React.FC<TextOverTextProps> = (props) => {
    const { top, bottom } = props;
    const classes = useStyles(props);

    return (
        <div className={classes.compContainer}>
          <div className={classes.pWrapper}>
            <p className={classes.top}>
              {top}
            </p>
          </div>
          <div className={classes.pWrapper}>
            <p className={classes.bottom}>
              {bottom}
            </p>
          </div>
        </div>
    );
};

export default TextOverText;