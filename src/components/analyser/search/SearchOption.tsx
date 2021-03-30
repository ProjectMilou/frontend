import React from 'react';
import NavLink from '../../header/NavLink';
import * as API from '../../../analyser/APIClient';

export type SearchOptionProps = {
  stock: API.Stock;
};
const SearchOption: React.FC<SearchOptionProps> = ({ stock }) => {
  const { symbol, name } = stock;
  const toDetail = `/analyser/${symbol}`;

  return (
    <div>
      <NavLink to={toDetail}>{name}</NavLink>
    </div>
  );
};

export default SearchOption;
