import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';
import * as API from '../../../analyser/APIClient';
import SearchOption from './SearchOption';
import { ErrorCode } from '../../../Errors';
import ErrorMessage from '../ErrorMessage';

export type SearchBarProps = {
  token: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ token }) => {
  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const [error, setError] = React.useState<ErrorCode | undefined>();

  const isMounted = React.useRef(true);
  const fetch = async () => {
    setError(undefined);
    try {
      const s = await API.listStocks(token);
      if (isMounted.current) {
        setStocks(s);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e.message);
      }
    }
  };

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: 280 }}>
      {/* Error handle */}
      {stocks && (
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
      )}
    </div>
  );
};

export default SearchBar;
