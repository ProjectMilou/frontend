import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';

interface PasswordRequirementProps {
  done: boolean;
  text: string;
}

const useStyles = makeStyles<Theme, PasswordRequirementProps>((theme) =>
  createStyles({
    checked: {
      height: theme.spacing(1.5),
      color: theme.palette.success.main
    },
    unchecked: {
      height: theme.spacing(1.5),
    },
    name: {
      fontSize: '12px',
      color: ({done}) => (done ? "grey": ""),
      textDecoration: ({done}) => (done ? "line-through": ""),
    },
  })
);

const PasswordRequirement: React.FC<PasswordRequirementProps> = (props) => {
  const { done, text } = props;
  const { checked, unchecked, name } = useStyles(props);
  return (
    <Box display="flex" alignItems="center">
      {done ? (
        <CheckCircleIcon className={checked} />
      ) : (
        <RadioButtonUncheckedIcon className={unchecked} />
      )}
      <Typography className={name}>{text}</Typography>
    </Box>
  );
};

export default PasswordRequirement;
