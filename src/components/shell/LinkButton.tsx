import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      textDecoration: 'underline',
      cursor: 'pointer',
      backgroundColor: 'white',
      border: 'none',
      padding: '0px',
      fontSize: '18px',
      lineHeight: '1.5',
      margin: theme.spacing(1, 'auto'),
      display: 'inline',
    },
  })
);

interface RegisterFailedWindowProps {
  handleEvent: () => void;
  text?: string;
  style?: React.CSSProperties;
}

const LinkButton: React.FC<RegisterFailedWindowProps> = (props) => {
  const { handleEvent, text, style } = props;
  const { t } = useTranslation();
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
      {text || t('shell.link')}
    </button>
  );
};

export default LinkButton;
