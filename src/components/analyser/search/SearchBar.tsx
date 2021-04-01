import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';
import * as API from '../../../analyser/APIClient';
import SearchOption from './SearchOption';
import { ErrorCode } from '../../../Errors';
import ErrorMessage from '../ErrorMessage';

// export type SearchBarProps = {
//   token: string;
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(2),
      minWidth: 10,
      maxWidth: 280,
    },
  })
);

const SearchBar: React.FC = () => {
  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const [error, setError] = React.useState<ErrorCode | undefined>();
  const classes = useStyles();

  const isMounted = React.useRef(true);
  const fetch = async () => {
    setError(undefined);
    try {
      const s = await API.listStocks('');
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

  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: 300 }}>
      {error && (
        <ErrorMessage
          error={error}
          messageKey="analyser.dashboard.errorMessage"
        />
      )}
      {stocks && (
        <Autocomplete
          id="search"
          freeSolo
          open={open}
          options={stocks}
          getOptionLabel={(option) =>
            `${option.symbol} ${option.name}${option.ISIN}${option.WKN}`
          }
          onInputChange={(e, v, r) => {
            if (r.startsWith('input')) {
              setOpen(true);
            } else {
              setOpen(false);
            }
          }}
          onChange={() => setOpen(false)}
          renderOption={(option) => <SearchOption stock={option} />}
          renderInput={(params) => (
            <TextField
              className={classes.textField}
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
