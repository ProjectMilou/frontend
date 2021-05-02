import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Link } from '@reach/router';
import React from 'react';
import * as API from '../../../analyser/APIClient';

// SearchOption props type declaration
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
      width: '100%',
      fontSize: theme.typography.body1.fontSize,
    },
  })
);

/**
 * A option will show the stock's name and will navigate to its detail page when it has been clicked.
 *
 * @param stock - Stock which related to a singel option
 * @return A single option in the pop up list of search bar
 */
const SearchOption: React.FC<SearchOptionProps> = ({ stock }) => {
  const { symbol, name } = stock;
  const route = `/analyser/${symbol}`;
  const { navlink } = useStyles();

  return (
    // Link is needed to highlight current selected stock
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
