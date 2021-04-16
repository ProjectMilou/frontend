import React, { useEffect } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { createStyles, Grow, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    iconCheck: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: 'auto',
      color: theme.palette.primary.main,
      marginTop: theme.spacing(2),
      display: 'block',
    },
  })
);

interface WelcomeWindowProps {
  closePopUp: () => void;
  text: string[];
  link?: () => void;
}

const WelcomeWindow: React.FC<WelcomeWindowProps> = (props) => {
  const { closePopUp, text } = props;
  const { iconCheck } = useStyles();

  const isMounted = React.useRef(true);

  useEffect(() => {
    setTimeout(() => {
      // only close the popup if it is still open
      if (isMounted.current) {
        closePopUp();
      }
    }, 5000);
    return () => {
      isMounted.current = false;
    };
  });

  const showCheckmark = true;
  return (
    <div>
      <Typography variant="h5" align="center">
        {text.map((line, index) => (
          <div key={line.charAt(0).concat(index.toString())}>
            {line}
            <br />
          </div>
        ))}
      </Typography>
      <Grow in={showCheckmark} timeout={1000}>
        <CheckCircleOutlineIcon className={iconCheck} color="primary" />
      </Grow>
    </div>
  );
};

export default WelcomeWindow;
