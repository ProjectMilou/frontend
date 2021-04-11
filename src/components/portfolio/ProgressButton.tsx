// adapted from https://github.com/mui-org/material-ui/blob/f285808fbf8728b0cc0435e65a76dbc691be3643/docs/src/pages/components/progress/CircularIntegration.tsx

import {
  Button,
  CircularProgress,
  makeStyles,
  PropTypes,
} from '@material-ui/core';
import React, { MouseEventHandler } from 'react';

export type ProgressButtonProps = {
  onClick: MouseEventHandler;
  disabled?: boolean;
  loading?: boolean;
  color?: PropTypes.Color;
  className?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
}));

/**
 * A button with a circular progress indicator.
 *
 * @param onClick - Click event handler
 * @param disabled - Whether the button is disabled. Note: The button is always disabled if {@param loading} is set.
 * @param loading - Whether the loading indicator should be displayed
 * @param color - The color of the button
 * @param className - Button class name(s)
 * @param children - The content of the button
 */
const ProgressButton: React.FC<ProgressButtonProps> = ({
  onClick,
  disabled,
  loading,
  color,
  className,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          disabled={loading || disabled}
          onClick={onClick}
          color={color}
          className={className}
        >
          {children}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default ProgressButton;
