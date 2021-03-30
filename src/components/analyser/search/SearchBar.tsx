import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';
import * as API from '../../../analyser/APIClient';
import SearchOption from './SearchOption';
// import { RouteComponentProps } from '@reach/router'
// import { ErrorCode } from '../../../Errors';

export type SearchBarProps = {
  stocks: API.Stock[];
};

const SearchBar: React.FC<SearchBarProps> = ({ stocks }) => {
  const [symbol, setSymbol] = React.useState<string>();

  return (
    <div style={{ width: 280 }}>
      <Autocomplete
        id="search"
        freeSolo
        options={stocks}
        getOptionLabel={(option) =>
          `${option.symbol} ${option.name}${option.ISIN}${option.WKN}`
        }
        renderOption={(option) => <SearchOption stock={option} />}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            // label="Search"
            margin="normal"
            variant="standard"
            placeholder="Name, Symbol, ISIN or WKN"
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
