import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import {
  Container,
  Box,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      height: theme.spacing(6),
    },
  })
);

const Page404: React.FC<RouteComponentProps> = () => {
  const { button } = useStyles();
  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Typography variant="h1" align="center" color="primary">
          404
        </Typography>
        <Typography variant="h6" align="center">
          {t('error.invalidPage')}
        </Typography>
        <Box mt={2} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className={button}
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            {t('error.action.home')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Page404;
