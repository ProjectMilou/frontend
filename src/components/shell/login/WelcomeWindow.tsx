import React, { useEffect } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Grow, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  iconCheck: {
    width: '100px',
    height: '100px',
    margin: 'auto',
    color: 'primary',
    marginTop: '20px',
    display: 'block',
  },
});

interface WelcomeWindowProps {
  closePopUp: () => void;
  text: string[];
  link?: () => void;
}

const WelcomeWindow: React.FC<WelcomeWindowProps> = (props) => {
  const { closePopUp, text } = props;
  const { iconCheck } = useStyles();

  useEffect(() => {
    setTimeout(() => {
      closePopUp();
    }, 3000);
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
