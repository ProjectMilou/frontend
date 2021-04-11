import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  button: {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
    fontSize: '18px',
    lineHeight: '1.5',
    margin: '10px auto',
    display: 'inline',
  },
});

interface LinkButtonProps {
  handleEvent: () => void;
  text?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { handleEvent, text, style, children } = props;
  const { button } = useStyles();

  return (
    <button
      className={button}
      type="button"
      onClick={() => {
        handleEvent();
      }}
      onKeyDown={() => {
        handleEvent();
      }}
      style={style}
    >
      {text || children}
    </button>
  );
};

export default LinkButton;
