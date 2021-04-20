import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Link } from '@reach/router';
import React from 'react';
import * as API from '../../../analyser/APIClient';

export type SearchOptionProps = {
  stock: API.Stock;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navlink: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      textTransform: 'none',
      textAlign: 'left',
      padding: 0,
      width: '100%',
      fontSize: theme.typography.body1.fontSize,
    },
  })
);

const SearchOption: React.FC<SearchOptionProps> = ({ stock }) => {
  const { symbol, name } = stock;
  const route = `/analyser/${symbol}`;
  const { navlink } = useStyles();

  return (
    <Link
      to={route}
      className={navlink}
      getProps={({ isCurrent }) => ({
        style: {
          fontWeight: isCurrent ? 'bold' : 'normal',
        },
      })}
    >
      {name}
    </Link>
  );
};

export default SearchOption;
